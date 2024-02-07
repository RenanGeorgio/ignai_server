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

  // leads
  .post("/leads", middlewares.JWT, leadsController.create)
  .post("/leads/:_id/items", middlewares.JWT, leadsController.createItem)
  .put("/leads?:_id", middlewares.JWT, leadsController.updateLeads)
  .get("/leads", middlewares.JWT, leadsController.list)
  .delete("/leads/:_id", middlewares.JWT, leadsController.remove)
  
export default routes;