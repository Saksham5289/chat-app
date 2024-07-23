/*
  Warnings:

  - You are about to drop the `Connection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PendingRequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Connection" DROP CONSTRAINT "Connection_friendId_fkey";

-- DropForeignKey
ALTER TABLE "Connection" DROP CONSTRAINT "Connection_userId_fkey";

-- DropForeignKey
ALTER TABLE "PendingRequest" DROP CONSTRAINT "PendingRequest_requesterId_fkey";

-- DropForeignKey
ALTER TABLE "PendingRequest" DROP CONSTRAINT "PendingRequest_userId_fkey";

-- DropTable
DROP TABLE "Connection";

-- DropTable
DROP TABLE "PendingRequest";
