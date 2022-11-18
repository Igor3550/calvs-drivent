import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { createUserTicket, listTicketsTypes, listUserTicket } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/", listUserTicket)
  .post("/", createUserTicket)
  .get("/types", listTicketsTypes);

export { ticketsRouter };
