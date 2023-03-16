-- CreateTable
CREATE TABLE "account_holder" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "account_holder_pkey" PRIMARY KEY ("id")
);
