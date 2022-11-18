import ticketRepository from "@/repositories/ticket-repository";

export async function getTicketsTypes() {
  const types = await ticketRepository.findTicketsTypes();
  return types;
}

const ticketService = {
  getTicketsTypes
};

export default ticketService;
