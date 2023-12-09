"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const uuid_1 = require("uuid");
const Order_enum_1 = require("../enums/Order-enum");
const OrderSchema = new mongoose.Schema({
    _id: { required: true, type: String, default: () => (0, uuid_1.v4)() },
    order_number: { required: true, type: String, default: () => (0, uuid_1.v4)() },
    products: [
        {
            product_id: { type: String, required: true },
            qty: { type: Number, required: true, default: 1 },
            density: { type: Number },
            color: { type: String },
        }
    ],
    user_id: {
        required: true,
        type: String
    },
    address: { type: String, required: true },
    total_cost: {
        type: Number,
        required: true,
        default: 0
    },
    status: { type: String, required: true, default: Order_enum_1.OrderStatus.CONFIRMED },
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: new Date() },
}, {
    versionKey: false,
});
exports.default = OrderSchema;
//# sourceMappingURL=order-schema.js.map