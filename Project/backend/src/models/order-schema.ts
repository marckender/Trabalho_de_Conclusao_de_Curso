import * as mongoose from "mongoose";
import { v4 as uuidV4 } from "uuid";
import { OrderStatus } from "../enums/Order-enum";

const OrderSchema = new mongoose.Schema(
  {
    _id: { required: true, type: String, default: () => uuidV4() },
    order_number: {required: true, type: String, default: () => uuidV4()},
    products: [
        {
            name: {type: String},
            image: {type: String},
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
    address: {type: String, required: true},
    total_cost:{
        type: Number,
        required: true,
        default: 0
    },
    status: {type:String, required: true, default: OrderStatus.CONFIRMED},
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: new Date() },
  },
{
    versionKey: false,
  }
);

export default OrderSchema;
