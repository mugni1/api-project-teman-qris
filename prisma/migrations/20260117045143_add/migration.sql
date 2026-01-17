-- CreateEnum
CREATE TYPE "Role" AS ENUM ('super_user', 'user');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'user';
