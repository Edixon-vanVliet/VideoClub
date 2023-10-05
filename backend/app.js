import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import tiposArticulosRoutes from "./routes/tiposArticulosRoutes.js";
import generosRoutes from "./routes/generosRoutes.js";
import idiomasRoutes from "./routes/idiomasRoutes.js";
import articulosRoutes from "./routes/articulosRoutes.js";
import elencoRoutes from "./routes/elencoRoutes.js";
import clientesRoutes from "./routes/clientesRoutes.js";
import empleadosRoutes from "./routes/empleadosRoutes.js";
import rentasRoutes from "./routes/rentasRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(json());

app.use("/api/tiposArticulos", tiposArticulosRoutes);
app.use("/api/generos", generosRoutes);
app.use("/api/idiomas", idiomasRoutes);
app.use("/api/articulos", articulosRoutes);
app.use("/api/elenco", elencoRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api/empleados", empleadosRoutes);
app.use("/api/rentas", rentasRoutes);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Conectado a la base de datos");

  app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.error("Error de conexión a la base de datos:", err);
});
