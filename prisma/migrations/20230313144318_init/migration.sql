-- CreateTable
CREATE TABLE "AccountHolder" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "AccountHolder_pkey" PRIMARY KEY ("id")
);
