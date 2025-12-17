/*
  Warnings:

  - You are about to drop the column `user_id` on the `company` table. All the data in the column will be lost.
  - Added the required column `password` to the `company` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "company" DROP CONSTRAINT "company_user_id_fkey";

-- DropIndex
DROP INDEX "company_user_id_key";

-- AlterTable
ALTER TABLE "company" DROP COLUMN "user_id",
ADD COLUMN     "password" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;
