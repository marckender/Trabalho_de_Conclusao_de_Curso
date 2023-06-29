"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
exports.default = ApiError;
//# sourceMappingURL=api-error.js.map