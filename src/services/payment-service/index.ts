import paymentRepository from "@/repositories/payment-repository";

async function getTicketPayment(ticketId: number) {
  return await paymentRepository.findTicketPayment(ticketId);
}

const paymentService = {
  getTicketPayment
};

export default paymentService;
