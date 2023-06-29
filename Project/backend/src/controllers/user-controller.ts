import userAction from "../actions/user-action";
import ResponseDto from "../dtos/response.dto";
import apiLogger from "../utils/api-logger";

class UserController {
    async create(req, res) {
        try {
            apiLogger.info(`[UserController] - create - req.body => ${JSON.stringify(req.body)}`);
            const response = await userAction.create(req.body, res);
            ResponseDto.httpSuccessResponse(res, 201, response);
          } catch (error) {
            apiLogger.info(`[UserController] - create - error => ${error}`);
            ResponseDto.httpErrorResponse(res, error);
          }
    }

}

export default new UserController();