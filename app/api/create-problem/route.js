import { currentUserRole, getCurrentUser } from "@/modules/auth/actions";
import { getJdoodleLanguage, runSubmissionsSequentially } from "@/lib/jdoodle";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request) {
	try {
		const userRole = await currentUserRole();
		const user = await getCurrentUser();

		if (userRole !== UserRole.ADMIN) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 },
			);
		}

		const body = await request.json();

		const {
			title,
			description,
			difficulty,
			tags,
			examples,
			constraints,
			testCases,
			codeSnippets,
			referenceSolutions,
		} = body;

		// Basic validation
		if (
			!title ||
			!description ||
			!difficulty ||
			!testCases ||
			!codeSnippets ||
			!referenceSolutions
		) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 },
			);
		}

		// Validate test cases
		if (!Array.isArray(testCases) || testCases.length === 0) {
			return NextResponse.json(
				{ error: "At least one test case is required" },
				{ status: 400 },
			);
		}

		// Validate reference solutions
		if (!referenceSolutions || typeof referenceSolutions !== "object") {
			return NextResponse.json(
				{
					error: "Reference solutions must be provided for all supported languages",
				},
				{ status: 400 },
			);
		}

		for (const [language, solutionCode] of Object.entries(
			referenceSolutions,
		)) {
			const jdoodleLanguage = getJdoodleLanguage(language);
			if (!jdoodleLanguage) {
				return NextResponse.json(
					{ error: `Unsupported language: ${language}` },
					{ status: 400 },
				);
			}

			const submissions = testCases.map(({ input, output }) => ({
				script: solutionCode,
				stdin: input,
				expected_output: output,
				language: jdoodleLanguage.language,
				versionIndex: jdoodleLanguage.versionIndex,
			}));

			const results = await runSubmissionsSequentially(submissions);

			for (let i = 0; i < results.length; i++) {
				const result = results[i];
				console.log(`Test case ${i + 1} details:`, {
					input: submissions[i].stdin,
					expectedOutput: submissions[i].expected_output,
					actualOutput: result.output,
					passed: result.passed,
					language,
				});

				if (!result.passed) {
					return NextResponse.json(
						{
							error: `Validation failed for ${language}`,
							testCase: {
								input: submissions[i].stdin,
								expectedOutput: submissions[i].expected_output,
								actualOutput: result.output,
							},
						},
						{ status: 400 },
					);
				}
			}
		}

		// Step 3: Save the problem in the database after all validations pass
		const newProblem = await db.problem.create({
			data: {
				title,
				description,
				difficulty,
				tags,
				examples,
				constraints,
				testCases,
				codeSnippets,
				referenceSolutions,
				userId: user.id,
			},
		});

		return NextResponse.json(
			{
				success: true,
				message: "Problem created successfully",
				data: newProblem,
			},
			{ status: 201 },
		);
	} catch (dbError) {
		console.error("Create problem error:", dbError);
		return NextResponse.json(
			{
				error: "Failed to create problem",
			},
			{ status: 500 },
		);
	}
}
