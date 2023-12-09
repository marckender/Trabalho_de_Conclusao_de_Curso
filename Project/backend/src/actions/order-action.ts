import cartRepository from "../repositories/cart-repository";
import orderRepository from "../repositories/order-repository";
import productRepository from "../repositories/product-repository";
import ApiError from "../utils/api-error";
import { v4 as uuidV4 } from "uuid";
import userAction from "./user-action";
import { UserRole } from "../enums/user-enum";


class OrderAction {
    async find(_id: string) {
      const loggedUser = await userAction.findById(_id)
      console.log(loggedUser)
      if(loggedUser.role === UserRole.ADMIN) {
        return await orderRepository.find()
      }
      return await orderRepository.find({user_id: _id});
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

            let cart = await cartRepository.findOne({user_id});

            if (!cart || !cart.products.length) {
               throw new ApiError(
                "cart not found",
                500
              );
            }

            const order = {
              ...cart.toObject(),
              _id: uuidV4(),
              address: req.body.address
            }

            console.log("______", order)

            const res = await orderRepository.create(order);

            console.log('***', res)

            if (res) {
                await cartRepository.findByIdAndDelete(cart.id);
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