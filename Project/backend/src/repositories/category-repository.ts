import * as mongoose from "mongoose";
import CategorySchema from "../models/category-schema";

export default mongoose.model("categories", CategorySchema);