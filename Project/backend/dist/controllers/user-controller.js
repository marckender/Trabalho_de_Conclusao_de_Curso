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
const user_action_1 = require("../actions/user-action");
const response_dto_1 = require("../dtos/response.dto");
const api_logger_1 = require("../utils/api-logger");
class UserController {
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield user_action_1.default.findAll();
                api_logger_1.default.info(`[UserController] - findAll - response => ${JSON.stringify(response)}`);
                response_dto_1.default.httpSuccessResponse(res, 201, response);
            }
            catch (error) {
                api_logger_1.default.info(`[UserController] - findAll - error => ${error}`);
                response_dto_1.default.httpErrorResponse(res, error);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                api_logger_1.default.info(`[UserController] - create - req.body => ${JSON.stringify(req.body)}`);
                const response = yield user_action_1.default.create(req.body, res);
                response_dto_1.default.httpSuccessResponse(res, 201, response);
            }
            catch (error) {
                api_logger_1.default.info(`[UserController] - create - error => ${error}`);
                response_dto_1.default.httpErrorResponse(res, error);
            }
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=user-controller.js.map