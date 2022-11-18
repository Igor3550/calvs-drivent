import { prisma } from "@/config";

async function findTicketsTypes() {
  return prisma.ticketType.findMany();
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

const ticketRepository = {
  findTicketsTypes,
  findTicketByUserId
};

export default ticketRepository;
