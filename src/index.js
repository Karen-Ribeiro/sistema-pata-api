import express from "express";
import { petRouter } from "./routes/petRouter.js";

const app = express();

app.use(express.json());

app.use(petRouter());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});