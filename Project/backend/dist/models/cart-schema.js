"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const uuid_1 = require("uuid");
const CartSchema = new mongoose.Schema({
    _id: { required: true, type: String, default: () => (0, uuid_1.v4)() },
    products: [
        {
            product_id: { type: String, required: true },
            qty: { type: Number, required: true, default: 1 },
            density: { type: Number },
            color: { type: String },
            price: { type: Number, required: true },
        }
    ],
    user_id: {
        required: true,
        type: String
    },
    total_cost: {
        type: Number,
        required: true,
        default: 0
    },
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: new Date() },
}, {
    versionKey: false,
});
exports.default = CartSchema;
//# sourceMappingURL=cart-schema.js.map