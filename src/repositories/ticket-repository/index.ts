import { prisma } from "@/config";
import { TicketStatus } from "@prisma/client";

async function findTicketsTypes() {
  return prisma.ticketType.findMany();
}

async function findTicketById(ticketId: number) {
  return prisma.ticket.findUnique({
    where: {
      id: ticketId
    },
    include: {
      Enrollment: true,
      TicketType: true
    },
  });
}

async function findTicketByUserId(userId: number) {
  return prisma.enrollment.findFirst({
    where: {
      userId: userId
    },
    include: {
      Ticket: {
        include: {
          TicketType: true
        }
      }
    }
  });
}

async function insertTicket(enrollmentId: number, ticketTypeId: number) {
  return prisma.ticket.create({
    data: {
      enrollmentId,
      ticketTypeId,
      status: TicketStatus.RESERVED
    }
  });
}

const ticketRepository = {
  findTicketById,
  findTicketsTypes,
  findTicketByUserId,
  insertTicket
};

export default ticketRepository;
