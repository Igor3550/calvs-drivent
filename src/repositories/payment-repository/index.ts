import { prisma } from "@/config";
import { PaymentEntity } from "@/protocols";
import { TicketStatus } from "@prisma/client";

async function findTicketPayment(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId: ticketId
    }
  });
}

async function insertPayment(payment: PaymentEntity) {
  await prisma.ticket.update({
    where: {
      id: payment.ticketId
    },
    data: {
      status: TicketStatus.PAID
    }
  });
  return prisma.payment.create({
    data: payment
  });
}

const paymentRepository = {
  findTicketPayment,
  insertPayment
};

export default paymentRepository;
