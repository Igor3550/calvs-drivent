import ticketRepository from "@/repositories/ticket-repository";
import { TicketType } from "@/protocols";
import { notFoundError } from "@/errors";

async function getTicketsTypes(): Promise<TicketType[]> {
  const types = await ticketRepository.findTicketsTypes() as TicketType[];
  return types;
}

export async function getTicketByUserId(userId: number) {
  const ticket = await ticketRepository.findTicketByUserId(userId);
  if(!ticket) throw notFoundError();
  if(!ticket.Ticket[0]) throw notFoundError();
  const returnTicket = {
    id: ticket.Ticket[0].id,
    status: ticket.Ticket[0].status,
    ticketTypeId: ticket.Ticket[0].ticketTypeId,
    enrollmentId: ticket.Ticket[0].enrollmentId,
    TicketType: {
      ...ticket.Ticket[0].TicketType
    },
    createdAt: ticket.Ticket[0].createdAt,
    updatedAt: ticket.Ticket[0].updatedAt,
  };
  return returnTicket;
}

const ticketService = {
  getTicketsTypes,
  getTicketByUserId
};

export default ticketService;
