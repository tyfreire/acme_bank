/*
  Warnings:

  - The values [CLOSE] on the enum `bank_account_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "bank_account_status_new" AS ENUM ('OPEN', 'CLOSED');
ALTER TABLE "bank_account" ALTER COLUMN "status" TYPE "bank_account_status_new" USING ("status"::text::"bank_account_status_new");
ALTER TYPE "bank_account_status" RENAME TO "bank_account_status_old";
ALTER TYPE "bank_account_status_new" RENAME TO "bank_account_status";
DROP TYPE "bank_account_status_old";
COMMIT;
