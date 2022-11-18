import { Request, Response } from "express";
import ticketService from "@/services/tickets-service";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";

export async function listTicketsTypes(req: Request, res: Response) {
  try {
    const types = await ticketService.getTicketsTypes();
    return res.send(types);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function listUserTicket(req: AuthenticatedRequest, res: Response) {
  const userId = Number(req.userId);
  try {
    const ticket = await ticketService.getTicketByUserId(userId);
    return res.send(ticket);
  } catch (error) {
    if(error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function createUserTicket(req: AuthenticatedRequest, res: Response) {
  const userId = Number(req.userId);
  const ticketTypeId = Number(req.body.ticketTypeId);
  if(!ticketTypeId) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const result = await ticketService.createTicket(userId, ticketTypeId);
    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    if(error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
