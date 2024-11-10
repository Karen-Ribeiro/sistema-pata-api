import { Router } from "express";
import { usuarioController } from "../controllers/usuarioController.js";
import { loginController } from "../controllers/loginController.js";
import { verificarToken } from "../middleware/verificarToken.js";
import { authEditarInformacoes } from "../middleware/authEditarInformacoes.js";
import { validarDadosUsuario } from "../middleware/validarDadosUsuario.js";
import { verificarAdm } from "../middleware/verificarAdmin.js";

export const usuarioRouter = () => {
	const router = Router();

	router.post("/login", async (req, res) => {
		return await loginController.loginUsuario(req, res);
	});

	router.get("/usuario", verificarToken, verificarAdm, async (req, res) => {
		return await usuarioController.listarUsuarios(req, res);
	});

	router.get("/usuario/:id", verificarToken, authEditarInformacoes, async (req, res) => {
		return await usuarioController.buscarUsuarioPorId(req, res);
	});

	router.post("/usuario", validarDadosUsuario, async (req, res) => {
		return await usuarioController.criarUsuario(req, res);
	});

	router.put("/usuario/:id", verificarToken, authEditarInformacoes, validarDadosUsuario, async (req, res) => {
		return await usuarioController.atualizarUsuario(req, res);
	});

	router.delete("/usuario/:id", verificarToken, authEditarInformacoes, async (req, res) => {
		return await usuarioController.deletarUsuario(req, res);
	});

	return router;
};
