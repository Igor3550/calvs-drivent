import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { TicketType } from "@/protocols";
import { notFoundError } from "@/errors";

async function getTicketsTypes(): Promise<TicketType[]> {
  const types = await ticketRepository.findTicketsTypes() as TicketType[];
  return types;
}

async function getTicketByUserId(userId: number) {
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

async function createTicket(userId: number, ticketTypeId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if(!enrollment) throw notFoundError();
  await ticketRepository.insertTicket(enrollment.id, ticketTypeId);
  return await getTicketByUserId(userId);
}

const ticketService = {
  getTicketsTypes,
  getTicketByUserId,
  createTicket
};

export default ticketService;
