import * as mongoose from "mongoose";
import ProductSchema from "../models/product-schema";

export default mongoose.model("products", ProductSchema);