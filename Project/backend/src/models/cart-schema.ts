import * as mongoose from "mongoose";
import { v4 as uuidV4 } from "uuid";

const CartSchema = new mongoose.Schema(
  {
    _id: { required: true, type: String, default: () => uuidV4() },
    products: [
        {
            product_id: { type: String, required: true },
            qty: { type: Number, required: true,default: 1 },
            density:  {type: Number},
            color: { type: String },
        }
    ],
    user_id: {
        required: true,
        type: String
    },
    total_cost:{
        type: Number,
        required: true,
        default: 0
    },
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: new Date() },
  },
{
    versionKey: false,
  }
);

export default CartSchema;
