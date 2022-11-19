import { Router } from "express";
import { authenticateToken, ticketIdValidation, paymentInputValidation } from "@/middlewares";
import { createTicketPayment, getTicketPayment } from "@/controllers/payments-controller";

const paymentRouter = Router();

paymentRouter
  .all("/*", authenticateToken)
  .get("/", ticketIdValidation, getTicketPayment)
  .post("/process", paymentInputValidation, createTicketPayment);

export { paymentRouter };
