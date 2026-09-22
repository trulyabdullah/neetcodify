/*
  Warnings:

  - You are about to drop the column `difficutly` on the `Problem` table. All the data in the column will be lost.
  - Added the required column `difficulty` to the `Problem` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Problem_difficutly_idx";

-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "difficutly",
ADD COLUMN     "difficulty" "Difficulty" NOT NULL;

-- CreateIndex
CREATE INDEX "Problem_difficulty_idx" ON "Problem"("difficulty");
