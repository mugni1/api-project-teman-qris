/*
  Warnings:

  - You are about to drop the column `phone_number` on the `OrderDetail` table. All the data in the column will be lost.
  - Added the required column `destination` to the `OrderDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderDetail" DROP COLUMN "phone_number",
ADD COLUMN     "destination" TEXT NOT NULL;
