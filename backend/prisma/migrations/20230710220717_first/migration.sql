-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "chavePix" TEXT NOT NULL,
    "apelido" TEXT NOT NULL,
    "creditos" INTEGER NOT NULL,
    "senha" TEXT NOT NULL,
    "criado" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rodada" (
    "id" TEXT NOT NULL,
    "jogo1" TEXT,
    "jogo2" TEXT,
    "jogo3" TEXT,
    "jogo4" TEXT,
    "jogo5" TEXT,
    "jogo6" TEXT,
    "jogo7" TEXT,
    "jogo8" TEXT,
    "jogo9" TEXT,
    "jogo10" TEXT,
    "criado" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rodada_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Respostas" (
    "id" TEXT NOT NULL,
    "jogo1" TEXT NOT NULL,
    "jogo2" TEXT NOT NULL,
    "jogo3" TEXT NOT NULL,
    "jogo4" TEXT NOT NULL,
    "jogo5" TEXT NOT NULL,
    "jogo6" TEXT NOT NULL,
    "jogo7" TEXT NOT NULL,
    "jogo8" TEXT NOT NULL,
    "jogo9" TEXT NOT NULL,
    "jogo10" TEXT NOT NULL,
    "criado" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado" TIMESTAMP(3) NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "Respostas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Respostas" ADD CONSTRAINT "Respostas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
