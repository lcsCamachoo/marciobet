-- AlterTable
ALTER TABLE "Respostas" ADD COLUMN     "rodadaId" TEXT;

-- AddForeignKey
ALTER TABLE "Respostas" ADD CONSTRAINT "Respostas_rodadaId_fkey" FOREIGN KEY ("rodadaId") REFERENCES "Rodada"("id") ON DELETE SET NULL ON UPDATE CASCADE;
