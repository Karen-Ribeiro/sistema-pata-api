import { Router } from "express";
import { petController } from "../controllers/petController.js";

export const petRouter = () => {
    const router = Router();

    router.get('/pets', async (req, res) => { 
       return await petController.listarPets(req, res);
    })

    router.get('/pet/:id', async (req, res) => {
       return await petController.buscarPetPorId(req, res);
    })

    router.post('/pet/', async (req, res) => {
       return await petController.adicionarPet(req, res);
    })

    router.put('/pet/:id', async (req, res) => {
       return await petController.atualizarPet(req, res);
    })

    router.delete('/pet/:id', async (req, res) => {
       return await petController.deletarPet(req, res);
    })
      
    return router;

}