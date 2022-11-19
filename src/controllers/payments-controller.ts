import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import paymentService from "@/services/payment-service";
import httpStatus from "http-status";

export async function getTicketPayment(req: AuthenticatedRequest, res: Response) {
  const ticketId = Number(req.query.ticketId);
  try {
    const payment = await paymentService.getTicketPayment(ticketId);
    return res.send(payment);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
