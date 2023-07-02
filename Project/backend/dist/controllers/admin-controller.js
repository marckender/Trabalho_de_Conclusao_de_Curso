"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_dto_1 = require("../dtos/response.dto");
const api_logger_1 = require("../utils/api-logger");
class AdminController {
    login(req, res) {
        try {
            // const response = appActions.getApiInfo();
            // apiLogger.error(`[AppController] - getAppInfo - response - ${JSON.stringify(response)}`);
            // ResponseDto.httpSuccessResponse(res, 200, response);
        }
        catch (error) {
            api_logger_1.default.error(`[AppController] - getAppInfo - error - ${JSON.stringify(error)}`);
            response_dto_1.default.httpErrorResponse(res, error);
        }
    }
}
exports.default = new AdminController();
//# sourceMappingURL=admin-controller.js.map