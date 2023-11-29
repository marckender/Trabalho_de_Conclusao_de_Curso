import * as mongoose from "mongoose";
import CategorySchema from "../models/user-schema";

export default mongoose.model("categories", CategorySchema);