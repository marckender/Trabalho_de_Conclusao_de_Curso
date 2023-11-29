"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const uuid_1 = require("uuid");
const user_enum_1 = require("../enums/user-enum");
const UserSchema = new mongoose.Schema({
    _id: { required: true, type: String, default: () => (0, uuid_1.v4)() },
    name: { required: true, type: String },
    email: { required: true, type: String, unique: true },
    role: { required: true, type: String, default: user_enum_1.UserRole.CLIENT },
    address: { type: String },
    password: { type: String },
    token: { type: String },
    reset_password_token: { type: Number },
    reset_password_time: { type: Date },
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: new Date() },
}, {
    versionKey: false,
});
exports.default = UserSchema;
//# sourceMappingURL=user-schema.js.map