import { notFoundError } from "@/errors";
import { Payment, PaymentEntity } from "@/protocols";
import paymentRepository from "@/repositories/payment-repository";
import ticketService from "@/services/tickets-service";

async function getTicketPayment(ticketId: number) {
  return await paymentRepository.findTicketPayment(ticketId);
}

async function createPayment(payment: Payment): Promise<PaymentEntity> {
  const ticket = await ticketService.getTicketById(payment.ticketId);
  if(!ticket) throw notFoundError();

  const cardLastDigits = String(payment.cardData.number).slice(-4);

  await paymentRepository.insertPayment({
    ticketId: payment.ticketId,
    value: ticket.TicketType.price,
    cardIssuer: payment.cardData.issuer,
    cardLastDigits: cardLastDigits
  });

  return await getTicketPayment(payment.ticketId);
}

const paymentService = {
  getTicketPayment,
  createPayment
};

export default paymentService;
