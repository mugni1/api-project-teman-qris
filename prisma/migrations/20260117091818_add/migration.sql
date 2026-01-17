-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('xl', 'axis', 'telkomsel', 'byu', 'smartfren', 'indosat');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'paid', 'expired', 'failed', 'cancelled');

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "price" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "provider" "Provider" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderDetail" (
    "id" TEXT NOT NULL,
    "transaction_id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" "Status" NOT NULL,
    "qris_url" TEXT NOT NULL,
    "qris_string" TEXT NOT NULL,
    "expires_at" TEXT NOT NULL,
    "paid_at" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "OrderDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrderDetail_transaction_id_key" ON "OrderDetail"("transaction_id");

-- AddForeignKey
ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
