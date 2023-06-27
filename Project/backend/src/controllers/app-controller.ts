import appActions from "../actions/app-action";
import ResponseDto from "../dtos/response.dto";
import apiLogger from "../utils/api-logger";

class AppController {
    getAppInfo(req, res) {
        try {
            const response = appActions.getApiInfo();
            apiLogger.error(`[AppController] - getAppInfo - response - ${JSON.stringify(response)}`);
            ResponseDto.httpSuccessResponse(res, 200, response);
        } catch (error) {
            apiLogger.error(`[AppController] - getAppInfo - error - ${JSON.stringify(error)}`);
            ResponseDto.httpErrorResponse(res, error);
        }
    }
}

export default new AppController();