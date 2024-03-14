import { Router } from "express";
import middlewares from "../middlewares";

import * as serverController from "../controllers/server/serverController";

import * as userController from "../controllers/user/userController";

import * as chatClientController from "../controllers/chat/chatClientController";

import * as authController from "../controllers/user/authController";

import * as leadsController from "../controllers/leads/leadsController";

import * as chatController from "../controllers/chat/chatController";

import * as messageController from "../controllers/chat/messageController";

import * as clientController from "../controllers/client/clientController";

import * as contactController from "../controllers/client/contactController";

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
  

  // ----- Chat -----
  // cria um cliente do chat
  .post("/api/chat/client", chatClientController.createClient)
  // lista todos os clientes
  .get("/api/chat/clients", chatClientController.listClients)
  // busca um cliente
  .get("/api/chat/client/email/:email", chatClientController.findClientByEmail)
  // busca um cliente
  .get("/api/chat/client/:_id", chatClientController.findClientById)

  // Cria um chat
  .post("/api/chat", middlewares.JWT, chatController.createChat)
  // Lista todos os chats de um usuário
  .get("/api/chat/:userId", middlewares.JWT, chatController.findUserChats)
  // Busca um chat
  .get("/api/chat/find/:firstId/:secondId", middlewares.JWT, chatController.findChat)

  // ----- Mensagens -----
  // Cria uma mensagem
  .post("/api/chat/message", middlewares.JWT, messageController.createMessage)
  // Lista todas as mensagens de um chat
  .get("/api/chat/message/:chatId", middlewares.JWT, messageController.getMessages)

  // Clientes
  // Cria um cliente

  .post("/client", middlewares.JWT, clientController.create)
  .get("/clients", middlewares.JWT, clientController.list)
  .post("/client/:client/contact", middlewares.JWT, contactController.createContact)
  .post("/client/:client/address", middlewares.JWT, contactController.createAddress)

export default routes;