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
const product_repository_1 = require("../repositories/product-repository");
const api_error_1 = require("../utils/api-error");
class CartAction {
    find(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield cart_repository_1.default.find({ user_id: _id });
        });
    }
    create(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = req.body;
                const user_id = req.user_id;
                if (!product.product_id || !product.qty || !product.density || !product.color) {
                    throw new api_error_1.default("product_id, qty, density, color are required", 500);
                }
                const foundProduct = yield product_repository_1.default.findById(product.product_id);
                if (!foundProduct) {
                    throw new api_error_1.default("Product not exist", 500);
                }
                let cart = yield cart_repository_1.default.findOne({ user_id });
                if (!cart) {
                    cart = new cart_repository_1.default({
                        user_id,
                    });
                }
                const existingItem = cart.products.find((item) => item.product_id === product.product_id);
                if (existingItem) {
                    throw new api_error_1.default("Product already exist on your cart", 500);
                }
                if (foundProduct.availableAmount < product.qty) {
                    throw new api_error_1.default("Quantity is unavailable", 500);
                }
                const price = foundProduct.price - foundProduct.discount;
                const productCart = {
                    product_id: foundProduct._id,
                    name: foundProduct.name,
                    price: price,
                    image: foundProduct.images[0],
                    density: product.density,
                    color: product.color,
                    qty: product.qty
                };
                cart.products.push(productCart);
                cart.total_cost += Number(productCart.price * product.qty);
                return yield cart_repository_1.default.create(cart);
            }
            catch (error) {
                throw new api_error_1.default("Error adding product to cart" + error.message, 500);
            }
        });
    }
    delete(user_id, product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let cart = yield cart_repository_1.default.findOne({ user_id });
            if (!cart) {
                throw new api_error_1.default("Product not found", 500);
            }
            const products = cart.products.filter((item) => item.product_id !== product_id);
            const toRemoveItem = cart.products.find(product => product.product_id === product_id);
            if (!toRemoveItem) {
                throw new api_error_1.default("Item not exist", 500);
            }
            const total_cost = cart.total_cost - toRemoveItem.price * toRemoveItem.qty;
            const data = {
                products,
                total_cost,
                updated_at: new Date()
            };
            return yield cart_repository_1.default.findByIdAndUpdate(cart._id, data);
        });
    }
}
exports.default = new CartAction();
//# sourceMappingURL=cart-action.js.map