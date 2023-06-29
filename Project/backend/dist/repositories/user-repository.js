"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const user_schema_1 = require("../models/user-schema");
exports.default = mongoose.model("users", user_schema_1.default);
//# sourceMappingURL=user-repository.js.map