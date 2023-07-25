"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_dto_1 = require("../dtos/response.dto");
const api_logger_1 = require("../utils/api-logger");
const cart_action_1 = require("../actions/cart-action");
class CartController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield cart_action_1.default.create(req);
                api_logger_1.default.error(`[CartController] - create - body - ${JSON.stringify(req.body)}`);
                response_dto_1.default.httpSuccessResponse(res, 200, response);
            }
            catch (error) {
                api_logger_1.default.error(`[CartController] - create - error - ${JSON.stringify(error)}`);
                response_dto_1.default.httpErrorResponse(res, error);
            }
        });
    }
}
exports.default = new CartController();
//# sourceMappingURL=cart-controller.js.map