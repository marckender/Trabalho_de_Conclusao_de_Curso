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
const order_repository_1 = require("../repositories/order-repository");
const api_error_1 = require("../utils/api-error");
const uuid_1 = require("uuid");
const user_action_1 = require("./user-action");
const user_enum_1 = require("../enums/user-enum");
class OrderAction {
    find(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const loggedUser = yield user_action_1.default.findById(_id);
            console.log(loggedUser);
            if (loggedUser.role === user_enum_1.UserRole.ADMIN) {
                return yield order_repository_1.default.find();
            }
            return yield order_repository_1.default.find({ user_id: _id });
        });
    }
    create(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderInfos = req.body;
                const user_id = req.user_id;
                if (!orderInfos.address) {
                    throw new api_error_1.default("Address is required", 400);
                }
                let cart = yield cart_repository_1.default.findOne({ user_id });
                if (!cart || !cart.products.length) {
                    throw new api_error_1.default("cart not found", 500);
                }
                const order = Object.assign(Object.assign({}, cart.toObject()), { _id: (0, uuid_1.v4)(), address: req.body.address });
                console.log("______", order);
                const res = yield order_repository_1.default.create(order);
                console.log('***', res);
                if (res) {
                    yield cart_repository_1.default.findByIdAndDelete(cart.id);
                }
            }
            catch (error) {
                throw new api_error_1.default("Error adding product to cart" + error.message, 500);
            }
        });
    }
}
exports.default = new OrderAction();
//# sourceMappingURL=order-action.js.map