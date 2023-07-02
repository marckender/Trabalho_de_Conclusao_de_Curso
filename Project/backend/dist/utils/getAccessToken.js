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
const api_logger_1 = require("./api-logger");
const user_action_1 = require("../actions/user-action");
const getAccessToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    api_logger_1.default.info(`[AuthAction] - getAccessToken - user => ${JSON.stringify(user)}`);
    const userdata = {
        access_token: jwt.sign({
            userId: user._id,
            email: user.email
        }, constants_1.JWT_SECRET, { expiresIn: constants_1.JWT_EXPIRATION }),
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
        }
    };
    yield user_action_1.default.findByIdAndUpdate(user._id, {
        token: userdata.access_token,
    });
    return userdata;
});
exports.default = getAccessToken;
//# sourceMappingURL=getAccessToken.js.map