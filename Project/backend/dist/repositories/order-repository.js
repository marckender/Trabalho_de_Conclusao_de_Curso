"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const order_schema_1 = require("../models/order-schema");
exports.default = mongoose.model("orders", order_schema_1.default);
//# sourceMappingURL=order-repository.js.map