import { Router } from "express";
import { authenticateToken, ticketIdValidation } from "@/middlewares";
import { getTicketPayment } from "@/controllers/payments-controller";

const paymentRouter = Router();

paymentRouter
  .all("/*", authenticateToken)
  .get("/", ticketIdValidation, getTicketPayment);

export { paymentRouter };
