import axios from "axios";

const JDOODLE_LANGUAGE_MAP = {
	PYTHON: {
		language: "python3",
		versionIndex: "6",
	},

	JAVASCRIPT: {
		language: "nodejs",
		versionIndex: "7",
	},

	JAVA: {
		language: "java",
		versionIndex: "6",
	},

	CPP: {
		language: "cpp17",
		versionIndex: "3",
	},

	GO: {
		language: "go",
		versionIndex: "6",
	},
};

export function getJdoodleLanguage(language) {
	return JDOODLE_LANGUAGE_MAP[language.toUpperCase()];
}

const LANGUAGE_DISPLAY_NAMES = {
	PYTHON: "Python",
	JAVASCRIPT: "JavaScript",
	JAVA: "Java",
	CPP: "C++",
	GO: "Go",
};

export function getLanguageDisplayName(language) {
	return LANGUAGE_DISPLAY_NAMES[language.toUpperCase()] || language;
}

const JDOODLE_URL = "https://api.jdoodle.com/v1/execute";

async function executeOnJdoodle({ script, stdin, language, versionIndex }) {
	try {
		const { data } = await axios.post(
			JDOODLE_URL,
			{
				clientId: process.env.JDOODLE_CLIENT_ID,
				clientSecret: process.env.JDOODLE_CLIENT_SECRET,
				script,
				stdin: stdin || "",
				language,
				versionIndex,
			},
			{
				headers: {
					"Content-Type": "application/json",
				},
			},
		);

		return data;
	} catch (error) {
		const status = error.response?.status;
		const message = error.response?.data?.error || error.message;

		console.error("JDoodle execution failed:", { status, message });

		if (status === 429) {
			return {
				output: "",
				error: "Code execution limit reached for today. Please try again later.",
				statusCode: 429,
			};
		}

		return {
			output: "",
			error: message || "Code execution failed.",
			statusCode: status || 500,
		};
	}
}

export async function runSubmissionsSequentially(submissions) {
	const results = [];

	for (const sub of submissions) {
		const res = await executeOnJdoodle(sub);

		const actualOutput = (res.output || "").trim();
		const expectedOutput = (sub.expected_output || "").trim();

		results.push({
			output: res.output,
			error: res.error,
			statusCode: res.statusCode,
			memory: res.memory,
			cpuTime: res.cpuTime,
			passed:
				res.statusCode === 200 &&
				!res.error &&
				actualOutput === expectedOutput,
		});
	}

	return results;
}
