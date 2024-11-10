-- DropForeignKey
ALTER TABLE "adocoes" DROP CONSTRAINT "adocoes_usuario_id_fkey";

-- AddForeignKey
ALTER TABLE "adocoes" ADD CONSTRAINT "adocoes_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
