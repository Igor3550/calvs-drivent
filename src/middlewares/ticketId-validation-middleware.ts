import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import ticketServices from "@/services/tickets-service";

export async function ticketIdValidation(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const ticketId = Number(req.query.ticketId);
  const userId = Number(req.userId);
  if(!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const ticket = await ticketServices.getTicketById(ticketId);
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
