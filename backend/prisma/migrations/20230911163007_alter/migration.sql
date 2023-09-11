-- CreateTable
CREATE TABLE "FrontPage" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "subtitulo" TEXT NOT NULL,
    "cronometroTxt" TEXT NOT NULL,
    "imagens" TEXT[],
    "premioTxt" TEXT NOT NULL,
    "criado" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FrontPage_pkey" PRIMARY KEY ("id")
);
