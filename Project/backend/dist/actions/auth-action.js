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
const bcrypt = require("bcrypt");
const api_error_1 = require("../utils/api-error");
const user_action_1 = require("./user-action");
const getAccessToken_1 = require("../utils/getAccessToken");
class AuthAction {
    login(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const isUserExist = yield user_action_1.default.findByEmail(body.email);
            if (isUserExist) {
                const isPasswordMatched = yield bcrypt.compare(body === null || body === void 0 ? void 0 : body.password, isUserExist.password);
                if (isPasswordMatched) {
                    return (0, getAccessToken_1.default)(isUserExist);
                }
            }
            throw new api_error_1.default("Invalid email or password.", 500);
        });
    }
}
exports.default = new AuthAction();
//# sourceMappingURL=auth-action.js.map