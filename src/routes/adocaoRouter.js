import { Router } from "express";
import { adocaoController } from "../controllers/adocaoController.js";


export const adocaoRouter = () => {
    const router = Router();

     router.get('/adocoes', async (req, res) => {     
        return await adocaoController.listarAdocoes(req, res);
     });

     router.get('/adocao/:id', async (req, res) => {
        return await adocaoController.buscarAdocaoPorId(req, res);
     });

     router.post('/adocao', async (req, res) => {
        return await adocaoController.registrarAdocao(req, res);
     });

     router.delete('/adocao/:id', async (req, res) => {
        return await adocaoController.cancelarAdocao(req, res);
     });

    return router;
};
