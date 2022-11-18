import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { listTicketsTypes } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", listTicketsTypes);

export { ticketsRouter };
