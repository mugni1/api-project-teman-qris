/*
  Warnings:

  - Added the required column `type_credit` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_status` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TypeCredit" AS ENUM ('credit', 'quota');

-- CreateEnum
CREATE TYPE "TypeStatus" AS ENUM ('promo', 'regular');

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "type_credit" "TypeCredit" NOT NULL,
ADD COLUMN     "type_status" "TypeStatus" NOT NULL;
