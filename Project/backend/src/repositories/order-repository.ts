import * as mongoose from "mongoose";
import OrderSchema from "../models/cart-schema";

export default mongoose.model("orders", OrderSchema);