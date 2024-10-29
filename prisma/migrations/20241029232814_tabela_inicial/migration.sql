-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nome_completo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "data_nascimento" DATE NOT NULL,
    "descricao" TEXT NOT NULL,
    "tamanho" TEXT NOT NULL,
    "personalidade" TEXT NOT NULL,
    "foi_adotado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adocoes" (
    "id" TEXT NOT NULL,
    "id_adotante" TEXT NOT NULL,
    "id_pet" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Adocoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Adocoes_id_pet_key" ON "Adocoes"("id_pet");

-- AddForeignKey
ALTER TABLE "Adocoes" ADD CONSTRAINT "Adocoes_id_adotante_fkey" FOREIGN KEY ("id_adotante") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adocoes" ADD CONSTRAINT "Adocoes_id_pet_fkey" FOREIGN KEY ("id_pet") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
