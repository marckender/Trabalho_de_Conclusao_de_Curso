import * as mongoose from "mongoose";
import UserSchema from "../models/user-schema";

export default mongoose.model("users", UserSchema);