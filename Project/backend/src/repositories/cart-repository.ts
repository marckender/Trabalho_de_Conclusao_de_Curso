import * as mongoose from "mongoose";
import CartSchema from "../models/cart-schema";

export default mongoose.model("carts", CartSchema);