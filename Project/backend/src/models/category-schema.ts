import * as mongoose from "mongoose";
import { v4 as uuidV4 } from "uuid";

const CategorySchema = new mongoose.Schema(
  {
    _id: { required: true, type: String, default: () => uuidV4() },
    name: { required: true, type: String, unique: true },
    SLUG:{required: true, type: String, unique: true},
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: new Date() },
  },
  {
    versionKey: false,
  }
);

export default CategorySchema;
