import cartRepository from "../repositories/cart-repository";
import ApiError from "../utils/api-error";

class CartAction {
    async create(body: any) {
        try {
            
            const products = body.body.products
            const user_id:string = body.user_id
            let cart = await cartRepository.findOne({user_id})
    
            if (!cart) {
                cart = new cartRepository({
                    user_id,
                    products: [],
                    total_cost: 0,
                });
            }

            for (const product of products) {
                if (!product.product_id || !product.name || !product.qty) {
                  throw new ApiError(
                    "Product ID, name, quantity, and price are required for each product",
                    500
                  );
                }
          
                const existingItem = cart.products.find((item) => item.product_id === product.product_id);
          
                if (existingItem) {
                  existingItem.qty += product.qty;
                  // existingItem.price += product.price * product.qty;
                } else {
                  cart.products.push(product);
                }
          
                cart.total_cost += Number(product.price) * Number(product.qty);
            }
          
    
            return await cartRepository.create(cart);
        } catch (error) {
            throw new ApiError(
                "Error adding product to cart" + error.message,
                500
            );
        }
    }
}

export default new CartAction();