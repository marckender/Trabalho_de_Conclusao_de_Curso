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
const jwt = require("jsonwebtoken");
const constants_1 = require("../config/constants");
const response_dto_1 = require("../dtos/response.dto");
const api_logger_1 = require("../utils/api-logger");
const user_repository_1 = require("../repositories/user-repository");
const user_enum_1 = require("../enums/user-enum");
class AuthMiddleware {
    isAuth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = req.headers["authorization"];
            api_logger_1.default.info(`[AuthMiddleware] - validate - token => ${token}`);
            if (token) {
                token = token.replace("Bearer", "").trim();
                jwt.verify(token, constants_1.JWT_SECRET, function (err, decoded) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            return response_dto_1.default.httpErrorResponse(res, "token invalid or expired", 401);
                        }
                        const user = yield user_repository_1.default.findOne({
                            _id: decoded.userId,
                            token,
                        });
                        api_logger_1.default.info(`[AuthMiddleware] - validate - user => ${user}`);
                        if (!user) {
                            return response_dto_1.default.httpErrorResponse(res, "User not authenticated. Please, sign in or create an account.", 401);
                        }
                        req.user_id = user === null || user === void 0 ? void 0 : user._id;
                        req.token = user.token;
                        req.role = user.role;
                        next();
                    });
                });
            }
            else {
                return response_dto_1.default.httpErrorResponse(res, "Token not found. Please, sign in or create an account.", 401);
            }
        });
    }
    isAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.role === user_enum_1.UserRole.ADMIN) {
                next();
            }
            else {
                return response_dto_1.default.httpErrorResponse(res, "Only Admin can access this resouces", 401);
            }
        });
    }
}
exports.default = new AuthMiddleware();
//# sourceMappingURL=auth-middleware.js.map