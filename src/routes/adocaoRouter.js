import { Router } from "express";
import { adocaoController } from "../controllers/adocaoController.js";
import { verificarToken } from "../middleware/verificarToken.js";
import { authEditarInformacoes } from "../middleware/authEditarInformacoes.js";


export const adocaoRouter = () => {
   const router = Router();

   router.get('/adocoes', verificarToken, async (req, res) => {
      return await adocaoController.listarAdocoes(req, res);
   });

   router.get('/adocao/:id', verificarToken, async (req, res) => {
      return await adocaoController.buscarAdocaoPorId(req, res);
   });

   router.get('/adocao/usuario/:id', verificarToken, authEditarInformacoes, async (req, res) => {
      return await adocaoController.buscarAdocaoPorUsuario(req, res);
   })

   router.post('/adocao', verificarToken, async (req, res) => {
      return await adocaoController.registrarAdocao(req, res);
   });

   return router;
};
