import cartRepository from "../repositories/cart-repository";
import productRepository from "../repositories/product-repository";
import ApiError from "../utils/api-error";

class CartAction {
    async find(_id: string) {
      return await cartRepository.find({user_id: _id});
    }

    async create(req: any) {
        try {
            
            const product = req.body
            const user_id:string = req.user_id
            if (!product.product_id || !product.qty || !product.density || !product.color) {
              throw new ApiError(
                "Product ID, name, quantity, and price are required for each product",
                500
              );
            }

            const foundProduct = await productRepository.findById(product.product_id)

            if(!foundProduct) {
              throw new ApiError(
                "Product not exist",
                500
              );
            }
            let cart = await cartRepository.findOne({user_id})
            if (!cart) {
                cart = new cartRepository({
                    user_id,
                });
            }
            const existingItem = cart.products.find((item) => item.product_id === product.product_id);
          
            if (existingItem) {
              throw new ApiError(
                "Product already exist on your cart",
                500
              );
            }

            if(foundProduct.availableAmount < product.qty) {
              throw new ApiError(
                "Quantity is unavailable",
                500
              );
            }
            const price = foundProduct.price - foundProduct.discount
            const productCart: any = {
              product_id: foundProduct._id,
              name: foundProduct.name,
              price: price,
              image: foundProduct.images[0],
              density: product.density,
              color: product.color,
              qty: product.qty
            }
               
            cart.products.push(productCart);
            cart.total_cost += Number(productCart.price* product.qty)
            return await cartRepository.create(cart);
        } catch (error) {
            throw new ApiError(
                "Error adding product to cart" + error.message,
                500
            );
        }
    }

    async delete(user_id: string, product_id: string) {
      let cart = await cartRepository.findOne({user_id})

      if (!cart) {
        throw new ApiError(
          "Product not found",
          500
        );
      }

      const products = cart.products.filter((item) => item.product_id !== product_id);
      const toRemoveItem = cart.products.find(product => product.product_id === product_id);

      if(!toRemoveItem) {
        throw new ApiError(
          "Item not exist",
          500
        );
      }

      const total_cost = cart.total_cost - toRemoveItem.price * toRemoveItem.qty;

      const data = {
         products,
         total_cost,
         updated_at: new Date()
      }
      return await cartRepository.findByIdAndUpdate(cart._id, data)

    }
}

export default new CartAction();