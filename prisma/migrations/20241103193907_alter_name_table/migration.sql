/*
  Warnings:

  - The `tamanho` column on the `pets` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `personalidade` column on the `pets` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tipo` column on the `usuarios` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[pet_id]` on the table `adocoes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "personalidades" AS ENUM ('calmo', 'brincalhao', 'independente');

-- CreateEnum
CREATE TYPE "tamanhos" AS ENUM ('pequeno', 'medio', 'grande');

-- CreateEnum
CREATE TYPE "tipos" AS ENUM ('usuario', 'administrador');

-- AlterTable
ALTER TABLE "adocoes" ALTER COLUMN "data_adocao" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "data_adocao" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "tamanho",
ADD COLUMN     "tamanho" "tamanhos",
DROP COLUMN "personalidade",
ADD COLUMN     "personalidade" "personalidades";

-- AlterTable
ALTER TABLE "usuarios" ALTER COLUMN "senha" SET DATA TYPE VARCHAR(100),
DROP COLUMN "tipo",
ADD COLUMN     "tipo" "tipos";

-- DropEnum
DROP TYPE "personalidade";

-- DropEnum
DROP TYPE "tamanho";

-- DropEnum
DROP TYPE "tipo";

-- CreateIndex
CREATE UNIQUE INDEX "adocoes_pet_id_key" ON "adocoes"("pet_id");
