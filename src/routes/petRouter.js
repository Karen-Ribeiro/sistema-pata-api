import { Router } from "express";
import { petController } from "../controllers/petController.js";
import { verificarToken } from "../middleware/verificarToken.js";
import { verificarAdm } from "../middleware/verificarAdmin.js";
import { validarDadosPet } from "../middleware/validarDadosPet.js";

export const petRouter = () => {
   const router = Router();

   router.get('/pets', async (req, res) => {
      return await petController.listarPets(req, res);
   })

   router.get('/pets/:idade', async (req, res) => { 
      return await petController.buscarPetsPorIdade(req, res);
   })

   router.get('/pet/:id', async (req, res) => {
      return await petController.buscarPetPorId(req, res);
   })

   router.post('/pet/', verificarToken, verificarAdm, validarDadosPet, async (req, res) => {
      return await petController.adicionarPet(req, res);
   })

   router.put('/pet/:id', verificarToken, verificarAdm, validarDadosPet, async (req, res) => {
      return await petController.atualizarPet(req, res);
   })

   router.delete('/pet/:id', verificarToken, verificarAdm, async (req, res) => {
      return await petController.deletarPet(req, res);
   })

   return router;

}