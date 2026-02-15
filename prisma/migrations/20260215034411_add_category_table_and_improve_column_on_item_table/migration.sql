/*
  Warnings:

  - You are about to drop the column `provider` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `type_credit` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `type_status` on the `Item` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seller_name` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sku_code` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unlimited_stock` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('credit', 'quota', 'games', 'bill');

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "provider",
DROP COLUMN "type_credit",
DROP COLUMN "type_status",
ADD COLUMN     "category_id" TEXT NOT NULL,
ADD COLUMN     "seller_name" TEXT NOT NULL,
ADD COLUMN     "sku_code" TEXT NOT NULL,
ADD COLUMN     "unlimited_stock" BOOLEAN NOT NULL;

-- DropEnum
DROP TYPE "Provider";

-- DropEnum
DROP TYPE "TypeCredit";

-- DropEnum
DROP TYPE "TypeStatus";

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "cover_url" TEXT NOT NULL,
    "type" "Type" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
