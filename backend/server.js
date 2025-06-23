import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usuariosRoutes from "./routes/usuariosRoutes.js";
import publicacionesRoutes from "./routes/publicacionesRoutes.js";
import logger from "./middlewares/logger.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);

import pool from "./db/connection.js";

app.use("/", usuariosRoutes);
app.use("/", publicacionesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});
