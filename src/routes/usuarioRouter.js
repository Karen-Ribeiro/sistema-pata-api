import { Router } from "express";
import { usuarioController } from "../controllers/usuarioController.js";
import { loginController } from "../controllers/loginController.js";

export const userRouter = () => {
	const router = Router();

	router.post("/login", async (req, res) => {
		return await loginController.loginUsuario(req, res);
	});

	router.get("/usuario", async (req, res) => {
		return await usuarioController.listarUsuarios(req, res);
	});

	router.get("/usuario/:id", async (req, res) => {
		return await usuarioController.buscarUsuarioPorId(req, res);
	});

	router.post("/usuario", async (req, res) => {
		return await usuarioController.criarUsuario(req, res);
	});

	router.put("/usuario/:id", async (req, res) => {
		return await usuarioController.atualizarUsuario(req, res);
	});

	router.delete("/usuario/:id", async (req, res) => {
		return await usuarioController.deletarUsuario(req, res);
	});

	return router;
};
