/*
  Warnings:

  - A unique constraint covering the columns `[transaction_invoice]` on the table `OrderDetail` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Status" ADD VALUE 'processing';
ALTER TYPE "Status" ADD VALUE 'error';

-- AlterTable
ALTER TABLE "OrderDetail" ADD COLUMN     "transaction_invoice" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "OrderDetail_transaction_invoice_key" ON "OrderDetail"("transaction_invoice");
