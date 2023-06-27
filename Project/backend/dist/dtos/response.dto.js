"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Response {
    httpSuccessResponse(res, status, result) {
        res.status(status).json(result);
    }
    httpErrorResponse(res, error, code = 500) {
        let statusCode = (error === null || error === void 0 ? void 0 : error.code) ? error === null || error === void 0 ? void 0 : error.code : code;
        let message = (error === null || error === void 0 ? void 0 : error.message) ? error.message : error;
        if (typeof message !== "string") {
            message = "Failed to process this request";
        }
        res.status(statusCode).json({ error: message });
    }
}
exports.default = new Response();
//# sourceMappingURL=response.dto.js.map