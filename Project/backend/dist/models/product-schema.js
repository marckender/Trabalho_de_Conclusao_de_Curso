"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const uuid_1 = require("uuid");
const ProductSchema = new mongoose.Schema({
    _id: { required: true, type: String, default: () => (0, uuid_1.v4)() },
    name: { type: String, required: true },
    category_id: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    discount: { type: Number, default: 0 },
    images: [{ type: String, required: true }],
    availableAmount: { type: Number, required: true },
    color: [{ type: String }],
    brand: { type: String },
    lenght: [{ type: String }],
    density: [{ type: String }],
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: new Date() },
}, {
    versionKey: false,
});
exports.default = ProductSchema;
//# sourceMappingURL=product-schema.js.map