import * as mongoose from "mongoose";
import OrderSchema from "../models/order-schema";

export default mongoose.model("orders", OrderSchema);