import Stripe from "stripe";
import userAction from "../actions/user-action";
import ApiError from "../utils/api-error";
import { PRIVATE_STRIPE_KEY } from "../config/constants";

class StripeService {

  private readonly stripeInstance: Stripe;

  constructor() {
    const key: string = PRIVATE_STRIPE_KEY;
    if (!key) {
      throw new ApiError(
        "Stripe Key not found, please, provide a valid one",
        400
      );
    }

    this.stripeInstance = new Stripe(key, {
      apiVersion: "2022-08-01",
    });
  }

  async pay(paymentData: any) {
    const customerData = {
        userId: paymentData.userId,
        token: paymentData.id
    };
    const customer = await this.createCustomer(customerData);

    paymentData.customerId = customer.id;

    const paymentIntent = await this.createPaymentIntent(paymentData);
    const confirmed = await this.confirmPaymentIntent(paymentIntent.id, paymentIntent.payment_method.toString());
   
    if (confirmed) {
        return {
            status: 'CONFIRMED',
            payment_intent: paymentIntent.id
        }
    }

    await this.cancelPaymentIntent(paymentIntent.id);

    return {
        status: 'CANCELLED',
        payment_intent: paymentIntent.id
    }
  }

  async createPaymentIntent(paymentData: any) {
    const params: any = {
      customer: paymentData.customerId,
      currency: 'USD',
      amount: paymentData.amount * 100,
      payment_method: !paymentData.livemode
      ? `pm_card_${paymentData.card.brand.toLowerCase()}`
      : paymentData.payment_data.card.id,
      payment_method_types: ["card"],
      description: "AFRO-HOME",
    };
    try {
      return await this.stripeInstance.paymentIntents.create(params);
    } catch (error) {
      throw new ApiError(
        "Failed to create payment, please retry",
        400
      );
    }
  }

  async confirmPaymentIntent(
    paymentIntentId: string,
    paymentMethod: string
  ): Promise<boolean> {
    const paymentIntent = await this.stripeInstance.paymentIntents.confirm(
      paymentIntentId,
      { payment_method: paymentMethod }
    );
    return paymentIntent.status === "succeeded";
  }

  async cancelPaymentIntent(paymentIntentId: string): Promise<boolean> {
    const retrievePaymentIntent = await this.retrievePaymentIntent(
      paymentIntentId
    );

    if (retrievePaymentIntent.status !== "succeeded") {
      const paymentIntent = await this.stripeInstance.paymentIntents.cancel(
        paymentIntentId
      );
      return paymentIntent.status === "canceled";
    }
    return false;
  }

  async createCustomer({ userId, token } : 
    { userId: string, token: string}
  ) {
    const user: any = await userAction.findById(userId);
    if (!user) {
      throw new ApiError("Failed to process Payment", 400);
    }
    const params: Stripe.CustomerCreateParams = {
      name: user.name,
      email: user.email,
      source: token,
    };
    return await this.stripeInstance.customers.create(params);
  }

  async retrievePaymentIntent(paymentIntentId: string) {
    return await this.stripeInstance.paymentIntents.retrieve(paymentIntentId);
  }

  async refund(chargeId: string) {
    return await this.stripeInstance.refunds.create({
      charge: chargeId,
    });
  }
}

export default new StripeService();
