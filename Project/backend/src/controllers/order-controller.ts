import { Request, Response } from "express";
import ResponseDto from "../dtos/response.dto";
import apiLogger from "../utils/api-logger";
import orderAction from "../actions/order-action";

class OrderController {
    async create(req: Request, res: Response) {
        try {
            const response = await orderAction.create(req);
            apiLogger.error(`[OrderController] - create - body - ${JSON.stringify(req.body)}`);
            ResponseDto.httpSuccessResponse(res, 200, response);
        } catch (error) {
            apiLogger.error(`[OrderController] - create - error - ${JSON.stringify(error)}`);
            ResponseDto.httpErrorResponse(res, error);
        }
    }

    async find(req: any, res: any) {
        try {
            const response = await orderAction.find(req.user_id);
            apiLogger.error(`[OrderController] - find - body - ${JSON.stringify(req.user_id)}`);
            ResponseDto.httpSuccessResponse(res, 200, response);
        } catch (error) {
            apiLogger.error(`[OrderController] - find - error - ${JSON.stringify(error)}`);
            ResponseDto.httpErrorResponse(res, error);
        }
    }
}

export default new OrderController();