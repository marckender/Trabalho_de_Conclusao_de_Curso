import * as mongoose from "mongoose";
import { v4 as uuidV4 } from "uuid";
import { UserRole } from "../enums/user-enum";

const UserSchema = new mongoose.Schema(
  {
    _id: { required: true, type: String, default: () => uuidV4() },
    name: { required: true, type: String },
    email: { required: true, type: String, unique: true },
    role: { required: true, type: String, default: UserRole.CLIENT },
    address: { type: String },
    password: { type: String },
    token: { type: String },
    reset_password_token: { type: Number },
    reset_password_time: { type: Date },
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: new Date() },
  },
  {
    versionKey: false,
  }
);

export default UserSchema;
