/*
  Warnings:

  - Added the required column `column_1_title` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `column_2` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `column_2_title` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studio` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "column_1" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "column_1_title" TEXT NOT NULL,
ADD COLUMN     "column_2" BOOLEAN NOT NULL,
ADD COLUMN     "column_2_title" TEXT NOT NULL,
ADD COLUMN     "studio" TEXT NOT NULL;
