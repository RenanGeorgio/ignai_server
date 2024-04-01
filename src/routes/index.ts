import { Router } from "express";
import middlewares from "../middlewares";

import * as serverController from "../controllers/server/serverController";

import * as userController from "../controllers/user/userController";

import * as authController from "../controllers/user/authController";

import * as leadsController from "../controllers/leads/leadsController";

const routes = Router();

routes
  // Test-server
  .get("/test", serverController.test)

  // auth
  .post("/auth/login", authController.login)
  .post("/auth/refresh", authController.refresh)

  // user
  .post("/user", userController.create)
  .get("/user", middlewares.JWT, userController.info)

  // ----- Kanban leads ----
  // Cria uma lead (coluna)
  .post("/leads", middlewares.JWT, leadsController.create)
  // Cria um card
  .post("/leads/:_id/items", middlewares.JWT, leadsController.createCard)
  // Atualiza as informações da lead, quando um card for movido
  .put("/leads?:_id", middlewares.JWT, leadsController.updateLeads)
  // Atualiza as informações do card
  .put("/leads/card/:_id", middlewares.JWT, leadsController.updateCardInfo)
  // lista todos as leads
  .get("/leads", middlewares.JWT, leadsController.list)
  // Deleta uma lead (coluna)
  .delete("/leads/:_id", middlewares.JWT, leadsController.remove)
  
export default routes;