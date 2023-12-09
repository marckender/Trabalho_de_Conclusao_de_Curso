import cartRepository from "../repositories/cart-repository";
import orderRepository from "../repositories/order-repository";
import ApiError from "../utils/api-error";
import { v4 as uuidV4 } from "uuid";
import userAction from "./user-action";
import { UserRole } from "../enums/user-enum";
import stripeServices from "../services/stripe-services";


class OrderAction {
  async find(_id: string) {
    const loggedUser = await userAction.findById(_id)
    console.log(loggedUser)
    if (loggedUser.role === UserRole.ADMIN) {
      return await orderRepository.find()
    }
    return await orderRepository.find({ user_id: _id });
  }

  async create(req: any) {
    try {

      const orderInfos = req.body

      const user_id = req.user_id

      if (!orderInfos.address) {
        throw new ApiError(
          "Address is required",
          400
        );
      }

      if (!orderInfos.payment_data) {
        throw new ApiError(
          "payment_data are required",
          400
        );
      }

      let cart = await cartRepository.findOne({ user_id });

      if (!cart || !cart.products.length) {
        throw new ApiError(
          "cart not found",
          500
        );
      }

      const paymentData = {
        ...orderInfos.payment_data,
        amount: cart.total_cost,
        userId: user_id,
      }

      const { status, payment_intent } = await stripeServices.pay(paymentData);

      if (status === 'CONFIRMED') {
        const order = {
          ...cart.toObject(),
          _id: uuidV4(),
          address: req.body.address
        }
  
        const res = await orderRepository.create(order);
  
        if (res) {
          await cartRepository.findByIdAndDelete(cart.id);
        } else {
           const retrievedPaymentIntent: any = await stripeServices.retrievePaymentIntent(payment_intent);

           if (retrievedPaymentIntent.status === "succeeded") {
            await stripeServices.refund(
              retrievedPaymentIntent.latest_charge
            );
          }
        }
      }

    } catch (error) {
      throw new ApiError(
        "Error adding product to cart" + error.message,
        500
      );
    }
  }
}

export default new OrderAction();