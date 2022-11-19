import { prisma } from "@/config";

async function findTicketPayment(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId: ticketId
    }
  });
}

const paymentRepository = {
  findTicketPayment
};

export default paymentRepository;
