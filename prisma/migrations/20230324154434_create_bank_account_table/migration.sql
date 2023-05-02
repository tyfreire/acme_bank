-- CreateEnum
CREATE TYPE "bank_account_type" AS ENUM ('CURRENT', 'SAVINGS');

-- CreateEnum
CREATE TYPE "bank_account_status" AS ENUM ('OPEN', 'CLOSE');

-- CreateTable
CREATE TABLE "bank_account" (
    "id" SERIAL NOT NULL,
    "type" "bank_account_type" NOT NULL,
    "status" "bank_account_status" NOT NULL,
    "account_holder_id" INTEGER NOT NULL,

    CONSTRAINT "bank_account_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bank_account" ADD CONSTRAINT "bank_account_account_holder_id_fkey" FOREIGN KEY ("account_holder_id") REFERENCES "account_holder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
