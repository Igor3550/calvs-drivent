import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { listTicketsTypes, listUserTicket } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/", listUserTicket)
  .get("/types", listTicketsTypes);

export { ticketsRouter };
