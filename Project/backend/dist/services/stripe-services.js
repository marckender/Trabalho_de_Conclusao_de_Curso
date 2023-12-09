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
const stripe_1 = require("stripe");
const user_action_1 = require("../actions/user-action");
const api_error_1 = require("../utils/api-error");
const constants_1 = require("../config/constants");
class StripeService {
    constructor() {
        const key = constants_1.PRIVATE_STRIPE_KEY;
        if (!key) {
            throw new api_error_1.default("Stripe Key not found, please, provide a valid one", 400);
        }
        this.stripeInstance = new stripe_1.default(key, {
            apiVersion: "2022-08-01",
        });
    }
    pay(paymentData) {
        return __awaiter(this, void 0, void 0, function* () {
            const customerData = {
                userId: paymentData.userId,
                token: paymentData.id
            };
            const customer = yield this.createCustomer(customerData);
            paymentData.customerId = customer.id;
            const paymentIntent = yield this.createPaymentIntent(paymentData);
            const confirmed = yield this.confirmPaymentIntent(paymentIntent.id, paymentIntent.payment_method.toString());
            if (confirmed) {
                return {
                    status: 'CONFIRMED',
                    payment_intent: paymentIntent.id
                };
            }
            yield this.cancelPaymentIntent(paymentIntent.id);
            return {
                status: 'CANCELLED',
                payment_intent: paymentIntent.id
            };
        });
    }
    createPaymentIntent(paymentData) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
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
                return yield this.stripeInstance.paymentIntents.create(params);
            }
            catch (error) {
                throw new api_error_1.default("Failed to create payment, please retry", 400);
            }
        });
    }
    confirmPaymentIntent(paymentIntentId, paymentMethod) {
        return __awaiter(this, void 0, void 0, function* () {
            const paymentIntent = yield this.stripeInstance.paymentIntents.confirm(paymentIntentId, { payment_method: paymentMethod });
            return paymentIntent.status === "succeeded";
        });
    }
    cancelPaymentIntent(paymentIntentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const retrievePaymentIntent = yield this.retrievePaymentIntent(paymentIntentId);
            if (retrievePaymentIntent.status !== "succeeded") {
                const paymentIntent = yield this.stripeInstance.paymentIntents.cancel(paymentIntentId);
                return paymentIntent.status === "canceled";
            }
            return false;
        });
    }
    createCustomer({ userId, token }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_action_1.default.findById(userId);
            if (!user) {
                throw new api_error_1.default("Failed to process Payment", 400);
            }
            const params = {
                name: user.name,
                email: user.email,
                //source: token,
            };
            return yield this.stripeInstance.customers.create(params);
        });
    }
    retrievePaymentIntent(paymentIntentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.stripeInstance.paymentIntents.retrieve(paymentIntentId);
        });
    }
    refund(chargeId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.stripeInstance.refunds.create({
                charge: chargeId,
            });
        });
    }
}
exports.default = new StripeService();
//# sourceMappingURL=stripe-services.js.map