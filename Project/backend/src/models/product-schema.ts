import * as mongoose from "mongoose";
import { v4 as uuidV4 } from "uuid";
const ProductSchema = new mongoose.Schema(
  {
    _id: { required: true, type: String, default: () => uuidV4() },
    name: { type: String, required: true },
    category_id: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    discount: { type: Number, default: 0},
    images: [{type: String, required: true}],
    availableAmount:{type:Number, required: true},
    color: [{ type: String }],
    brand: {type: String},
    lenght: [{ type: String }],
    density:  [{type: Number}],
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: new Date() },
  },
  {
    versionKey: false,
  }
);

export default ProductSchema;