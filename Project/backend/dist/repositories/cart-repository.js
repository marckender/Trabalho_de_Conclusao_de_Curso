"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const cart_schema_1 = require("../models/cart-schema");
exports.default = mongoose.model("products", cart_schema_1.default);
//# sourceMappingURL=cart-repository.js.map