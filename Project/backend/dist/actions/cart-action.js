"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cart_repository_1 = require("../repositories/cart-repository");
const api_error_1 = require("../utils/api-error");
class CartAction {
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = body.body.items;
                const userId = body.userId;
                let cart = yield cart_repository_1.default.findOne({ userId });
                if (!cart) {
                    cart = new cart_repository_1.default({
                        userId,
                        items: [],
                        totalCost: 0,
                    });
                }
                for (const product of products) {
                    if (!product.productId || !product.name || !product.qty || !product.price) {
                        throw new api_error_1.default("Product ID, name, quantity, and price are required for each product", 500);
                    }
                    const existingItem = cart.items.find((item) => item.productId === product.productId);
                    if (existingItem) {
                        existingItem.qty += product.qty;
                        existingItem.price += product.price * product.qty;
                    }
                    else {
                        cart.items.push(product);
                    }
                    cart.totalCost += Number(product.price) * Number(product.qty);
                }
                return yield cart_repository_1.default.create(cart);
            }
            catch (error) {
                throw new api_error_1.default("Error adding product to cart" + error.message, 500);
            }
        });
    }
}
exports.default = new CartAction();
//# sourceMappingURL=cart-action.js.map