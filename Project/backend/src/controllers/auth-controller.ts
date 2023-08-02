import { Request, Response } from "express";
import AuthAction from "../actions/auth-action";
import ResponseDto from "../dtos/response.dto";
import apiLogger from "../utils/api-logger";

class AuthController {
    async login(req: Request, res: Response):Promise<void> {
        try {
            apiLogger.error(`[AuthController] - login - email - ${req.body.email}`);
            const response = await AuthAction.login(req.body);
            res.send(response)
        } catch (error) {
            apiLogger.error(`[AuthController] - login - error - ${JSON.stringify(error)}`);
            ResponseDto.httpErrorResponse(res, error);
        }
    }

    async logout(req: Request, res:Response):Promise<void> {
        try {
          await AuthAction.logout(req);
          ResponseDto.httpSuccessResponse(res, 200, {
            message: "successfully Logout !",
          });
        } catch (error) {
          apiLogger.error(
            `[AuthController] - logout - error => ${JSON.stringify(error)}`
          );
          ResponseDto.httpErrorResponse(res, error);
        }
      }
}

export default new AuthController();