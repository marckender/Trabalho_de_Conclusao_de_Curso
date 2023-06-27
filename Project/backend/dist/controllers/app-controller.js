"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_action_1 = require("../actions/app-action");
const response_dto_1 = require("../dtos/response.dto");
const api_logger_1 = require("../utils/api-logger");
class AppController {
    getAppInfo(req, res) {
        try {
            const response = app_action_1.default.getApiInfo();
            api_logger_1.default.error(`[AppController] - getAppInfo - response - ${JSON.stringify(response)}`);
            response_dto_1.default.httpSuccessResponse(res, 200, response);
        }
        catch (error) {
            api_logger_1.default.error(`[AppController] - getAppInfo - error - ${JSON.stringify(error)}`);
            response_dto_1.default.httpErrorResponse(res, error);
        }
    }
}
exports.default = new AppController();
//# sourceMappingURL=app-controller.js.map