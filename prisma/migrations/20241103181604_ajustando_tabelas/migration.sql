/*
  Warnings:

  - You are about to drop the `Adocoes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "personalidade" AS ENUM ('calmo', 'brincalhao', 'independente');

-- CreateEnum
CREATE TYPE "tamanho" AS ENUM ('pequeno', 'medio', 'grande');

-- CreateEnum
CREATE TYPE "tipo" AS ENUM ('usuario', 'administrador');

-- DropForeignKey
ALTER TABLE "Adocoes" DROP CONSTRAINT "Adocoes_id_adotante_fkey";

-- DropForeignKey
ALTER TABLE "Adocoes" DROP CONSTRAINT "Adocoes_id_pet_fkey";

-- DropTable
DROP TABLE "Adocoes";

-- DropTable
DROP TABLE "Pet";

-- DropTable
DROP TABLE "Usuario";

-- CreateTable
CREATE TABLE "adocoes" (
    "id" SERIAL NOT NULL,
    "pet_id" INTEGER NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "data_adocao" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "adocoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "especie" VARCHAR(100) NOT NULL,
    "data_nascimento" DATE NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "tamanho" "tamanho",
    "personalidade" "personalidade",
    "adotado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "senha" VARCHAR(32) NOT NULL,
    "telefone" VARCHAR(11) NOT NULL,
    "tipo" "tipo",

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "adocoes" ADD CONSTRAINT "adocoes_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "adocoes" ADD CONSTRAINT "adocoes_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
