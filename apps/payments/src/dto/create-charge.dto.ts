import Stripe from 'stripe';

export class CreateChargeDTO {
  card: Stripe.PaymentMethodCreateParams.Card1;
  amount: number;
}
