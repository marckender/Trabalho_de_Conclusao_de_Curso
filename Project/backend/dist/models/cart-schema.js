"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const uuid_1 = require("uuid");
const CartSchema = new mongoose.Schema({
    _id: { required: true, type: String, default: () => (0, uuid_1.v4)() },
    items: [
        {
            productId: { type: String, required: true },
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            price: { type: Number, required: true },
        }
    ],
    userId: {
        required: true,
        type: String
    },
    quantity: {
        required: true,
        type: Number,
        default: 1
    },
    totalCost: {
        type: Number,
        required: true,
        default: 0
    },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
}, {
    versionKey: false,
});
exports.default = CartSchema;
//# sourceMappingURL=cart-schema.js.map