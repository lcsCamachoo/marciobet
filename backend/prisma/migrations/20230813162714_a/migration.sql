/*
  Warnings:

  - Added the required column `dia` to the `Jogos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Jogos" ADD COLUMN     "dia" TEXT NOT NULL,
ALTER COLUMN "descricao" DROP NOT NULL,
ALTER COLUMN "local" DROP NOT NULL;
