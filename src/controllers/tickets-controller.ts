import { Request, Response } from "express";
import ticketService from "@/services/tickets-service";
import httpStatus from "http-status";

export async function listTicketsTypes(req: Request, res: Response) {
  try {
    const types = await ticketService.getTicketsTypes();
    return res.send(types);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
