"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const user_schema_1 = require("../models/user-schema");
exports.default = mongoose.model("categories", user_schema_1.default);
//# sourceMappingURL=category-repository.js.map