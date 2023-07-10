import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/constants";
import responseDto from "../dtos/response.dto";
import apiLogger from "../utils/api-logger";
import userRepository from "../repositories/user-repository";
import { UserRole } from "../enums/user-enum";

class AuthMiddleware {
    async isAuth(req, res, next) {
        let token: string = req.headers["authorization"];
        apiLogger.info(`[AuthMiddleware] - validate - token => ${token}`);

        if (token) {
            token = token.replace("Bearer", "").trim();
            jwt.verify(token, JWT_SECRET, async function (err, decoded:any) {
                if (err) {
                return responseDto.httpErrorResponse(
                    res,
                    "token invalid or expired",
                    401
                );
                }
                const user = await userRepository.findOne({
                _id: decoded.userId,
                token,
                });

                apiLogger.info(`[AuthMiddleware] - validate - user => ${user}`);

                if (!user) {
                return responseDto.httpErrorResponse(
                    res,
                    "User not authenticated. Please, sign in or create an account.",
                    401
                );
                }
                req.userId = user?._id;
                req.token = user.token;
                req.role = user.role;
                next();
            });
        } else {
        return responseDto.httpErrorResponse(
            res,
            "Token not found. Please, sign in or create an account.",
            401
        );
        }
    }

    async isAdmin(req, res, next) {
        if(req.role === UserRole.ADMIN){
            next()
        } else {
            return responseDto.httpErrorResponse(
                res,
                "Only Admin can access this resouces",
                401
              );
        }
    }
}

export default new AuthMiddleware();