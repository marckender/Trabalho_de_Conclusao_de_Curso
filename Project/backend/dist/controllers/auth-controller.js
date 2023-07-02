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
const auth_action_1 = require("../actions/auth-action");
const response_dto_1 = require("../dtos/response.dto");
const api_logger_1 = require("../utils/api-logger");
class AuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                api_logger_1.default.error(`[AuthController] - login - email - ${req.body.email}`);
                const response = yield auth_action_1.default.login(req.body);
                res.send(response);
            }
            catch (error) {
                api_logger_1.default.error(`[AuthController] - login - error - ${JSON.stringify(error)}`);
                response_dto_1.default.httpErrorResponse(res, error);
            }
        });
    }
}
exports.default = new AuthController();
//# sourceMappingURL=auth-controller.js.map