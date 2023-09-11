/*
  Warnings:

  - Added the required column `videoUrl` to the `FrontPage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FrontPage" ADD COLUMN     "videoUrl" TEXT NOT NULL;
