import express from "express";
import { petRouter } from "./routes/petRouter.js";
import { userRouter } from "./routes/usuarioRouter.js";

const app = express();

app.use(express.json());

app.use(petRouter());
app.use(userRouter()); 

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});