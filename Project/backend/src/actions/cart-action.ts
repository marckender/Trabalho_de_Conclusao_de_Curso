import cartRepository from "../repositories/cart-repository";
import ApiError from "../utils/api-error";

class CartAction {
    async create(body: any) {
        try {
            
            const products = body.body.items
            const userId:string = body.userId
            let cart = await cartRepository.findOne({userId})
    
            if (!cart) {
                cart = new cartRepository({
                    userId,
                    items: [],
                    totalCost: 0,
                });
            }

            for (const product of products) {
                if (!product.productId || !product.name || !product.qty || !product.price) {
                  throw new ApiError(
                    "Product ID, name, quantity, and price are required for each product",
                    500
                  );
                }
          
                const existingItem = cart.items.find((item) => item.productId === product.productId);
          
                if (existingItem) {
                  existingItem.qty += product.qty;
                  existingItem.price += product.price * product.qty;
                } else {
                  cart.items.push(product);
                }
          
                cart.totalCost += Number(product.price) * Number(product.qty);
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