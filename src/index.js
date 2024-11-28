import express from "express";
import { petRouter } from "./routes/petRouter.js";
import { usuarioRouter } from "./routes/usuarioRouter.js";
import { adocaoRouter } from "./routes/adocaoRouter.js";
import dotenv from "dotenv";
import cors from "cors"

const app = express();

app.use(cors())
app.use(express.json());
app.use(petRouter());
app.use(usuarioRouter());
app.use(adocaoRouter());
dotenv.config();

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
