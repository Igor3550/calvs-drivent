import { prisma } from "@/config";

async function findTicketsTypes() {
  return prisma.ticketType.findMany();
}

const ticketRepository = {
  findTicketsTypes
};

export default ticketRepository;
