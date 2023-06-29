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
const user_repository_1 = require("../repositories/user-repository");
const api_error_1 = require("../utils/api-error");
const encryptPaswword_1 = require("../utils/encryptPaswword");
class UserAction {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_repository_1.default.find().select(["-password", "-token"]);
        });
    }
    create(user, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const email = (_a = user === null || user === void 0 ? void 0 : user.email) === null || _a === void 0 ? void 0 : _a.replace(/\s/g, '').toLowerCase();
            const checkEmail = yield this.findByEmail(email);
            if (checkEmail) {
                throw new api_error_1.default("User already exists. Please login.", 500);
            }
            if (!email || !user.password || !user.name) {
                throw new api_error_1.default("Email, Password, Name is required.", 500);
            }
            const encryptedPassword = yield (0, encryptPaswword_1.default)(user.password);
            const data = Object.assign(Object.assign({}, user), { email, password: encryptedPassword });
            let createdUser = yield user_repository_1.default.create(data);
            if (createdUser._id) {
                return createdUser;
            }
            else {
                throw new api_error_1.default("Failed to Create Account, please retry !", 500);
            }
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_repository_1.default.findOne({ email });
        });
    }
}
exports.default = new UserAction();
//# sourceMappingURL=user-action.js.map