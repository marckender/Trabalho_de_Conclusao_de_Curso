"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const product_schema_1 = require("../models/product-schema");
exports.default = mongoose.model("products", product_schema_1.default);
//# sourceMappingURL=product-repository.js.map