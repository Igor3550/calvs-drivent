import Joi from "joi";

const cardDataSchema = Joi.object({
  issuer: Joi.string(),
  number: Joi.number(),
  name: Joi.string(),
  expirationDate: Joi.string() || Joi.date(),
  cvv: Joi.number()
});

export const createPaymentSchema = Joi.object({
  ticketId: Joi.number().required(),
  cardData: cardDataSchema
});
