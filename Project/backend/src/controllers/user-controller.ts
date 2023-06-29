import userAction from "../actions/user-action";
import ResponseDto from "../dtos/response.dto";
import apiLogger from "../utils/api-logger";

class UserController {
    async findById(req, res) {
      try {
        apiLogger.info(`[UserController] - findById - req.params.id => ${req.params.id}`);
        const response = await userAction.findById(req.params.id);
        ResponseDto.httpSuccessResponse(res, 201, response);
      } catch (error) {
        apiLogger.info(`[UserController] - findById - error => ${error}`);
        ResponseDto.httpErrorResponse(res, error);
      }
    }
    async findAll(req, res) {
      try {
        const response = await userAction.findAll();
        apiLogger.info(`[UserController] - findAll - response => ${JSON.stringify(response)}`);
        ResponseDto.httpSuccessResponse(res, 201, response);
      } catch (error) {
        apiLogger.info(`[UserController] - findAll - error => ${error}`);
        ResponseDto.httpErrorResponse(res, error);
      }
    }

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