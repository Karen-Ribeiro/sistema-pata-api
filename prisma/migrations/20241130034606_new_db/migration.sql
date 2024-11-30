-- CreateEnum
CREATE TYPE "personalidades" AS ENUM ('calmo', 'brincalhao', 'independente');

-- CreateEnum
CREATE TYPE "tamanhos" AS ENUM ('pequeno', 'medio', 'grande');

-- CreateEnum
CREATE TYPE "tipos" AS ENUM ('usuario', 'administrador');

-- CreateTable
CREATE TABLE "pets" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "especie" VARCHAR(100) NOT NULL,
    "data_nascimento" DATE NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "tamanho" "tamanhos",
    "personalidade" "personalidades",
    "adotado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "senha" VARCHAR(100) NOT NULL,
    "telefone" VARCHAR(11) NOT NULL,
    "endereco" VARCHAR(350) NOT NULL,
    "tipo" "tipos",

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adocoes" (
    "id" SERIAL NOT NULL,
    "pet_id" INTEGER NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "data_adocao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "adocoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "adocoes_pet_id_key" ON "adocoes"("pet_id");

-- AddForeignKey
ALTER TABLE "adocoes" ADD CONSTRAINT "adocoes_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "adocoes" ADD CONSTRAINT "adocoes_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
