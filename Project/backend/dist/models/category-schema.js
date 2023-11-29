"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const uuid_1 = require("uuid");
const CategorySchema = new mongoose.Schema({
    _id: { required: true, type: String, default: () => (0, uuid_1.v4)() },
    name: { required: true, type: String, unique: true },
    SLUG: { required: true, type: String, unique: true },
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: new Date() },
}, {
    versionKey: false,
});
exports.default = CategorySchema;
//# sourceMappingURL=category-schema.js.map