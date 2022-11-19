import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import paymentService from "@/services/payment-service";
import httpStatus from "http-status";
import { Payment } from "@/protocols";

export async function getTicketPayment(req: AuthenticatedRequest, res: Response) {
  const ticketId = Number(req.query.ticketId);
  try {
    const payment = await paymentService.getTicketPayment(ticketId);
    return res.send(payment);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function createTicketPayment(req: AuthenticatedRequest, res: Response) {
  const payment = req.body as Payment;

  try {
    const result = await paymentService.createPayment(payment);
    return res.send(result);
  } catch (error) {
    if(error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
