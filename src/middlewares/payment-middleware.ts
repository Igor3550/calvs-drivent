import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import { createPaymentSchema } from "@/schemas";
import ticketService from "@/services/tickets-service";
import { Payment } from "@/protocols";

export async function paymentInputValidation(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const userId = req.userId;
  const payment = req.body as Payment;

  try {
    const { error } = createPaymentSchema.validate(payment);
    if(error) return res.sendStatus(httpStatus.BAD_REQUEST);

    const ticket = await ticketService.getTicketById(payment.ticketId);
    if(!ticket) return res.sendStatus(httpStatus.NOT_FOUND);
    if(userId !== ticket.Enrollment.userId) return res.sendStatus(httpStatus.UNAUTHORIZED);
    
    next();
  } catch (error) {
    if(error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
