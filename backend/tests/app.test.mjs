import request from "supertest";
import { describe, it, beforeAll, expect } from "vitest";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usuariosRoutes from "../../backend/routes/usuariosRoutes.js";
import publicacionesRoutes from "../../backend/routes/publicacionesRoutes.js";
import logger from "../../backend/middlewares/logger.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/", usuariosRoutes);
app.use("/", publicacionesRoutes);

describe("API Endpoints", () => {
  let token;

  beforeAll(async () => {
    // Obtener token de login
    const loginResponse = await request(app)
      .post("/login")
      .send({ email: "usuario@feriabike.cl", password: "123456" });
    token = loginResponse.body.token;
  });

  // Pruebas para usuariosRoutes
  describe("Usuarios Routes", () => {
    it("POST /login con credenciales correctas retorna un objeto con token", async () => {
      const response = await request(app).post("/login").send({
        email: "usuario@feriabike.cl",
        password: "123456",
      }); 
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("token");
    });

    it('POST /login con credenciales incorrectas retorna status 400', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'admin', password: 'wrong' });
    expect(res.statusCode).toBe(400);
    });

    it("POST /obtener información del usuario", async () => {
      const response = await request(app)
        .get("/usuarios")
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
    });

    it("POST /obtener las publicaciones de un usuario", async () => {
      const response = await request(app)
        .get("/publicaciones/usuario")
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
    });

    it("POST /obtener las notificaciones de un usuario", async () => {
      const response = await request(app)
        .get("/notificaciones")
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
    });

    it("POST /obtener las ventas de un usuario", async () => {
      const response = await request(app)
        .get("/ventas/usuario")
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
    });

    it("POST /obtener las compras de un usuario", async () => {
      const response = await request(app)
        .get("/compras/usuario")
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
    });
  }); 

  // Pruebas para publicacionesRoutes
  describe("Publicaciones Routes", () => {
    it("POST / obtener todas las publicaciones", async () => {
      const response = await request(app).get("/publicaciones");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("publicaciones");
      expect(response.body).toHaveProperty("total");
    });

  });
});
