-- CreateTable
CREATE TABLE "Jogos" (
    "id" TEXT NOT NULL,
    "time1" TEXT NOT NULL,
    "time2" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "horario" TIMESTAMP(3) NOT NULL,
    "local" TEXT NOT NULL,
    "rodadaId" TEXT,

    CONSTRAINT "Jogos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Jogos" ADD CONSTRAINT "Jogos_rodadaId_fkey" FOREIGN KEY ("rodadaId") REFERENCES "Rodada"("id") ON DELETE SET NULL ON UPDATE CASCADE;
