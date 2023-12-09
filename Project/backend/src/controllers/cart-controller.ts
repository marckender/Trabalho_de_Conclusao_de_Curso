import { Request, Response } from "express";
import ResponseDto from "../dtos/response.dto";
import apiLogger from "../utils/api-logger";
import CartAction from "../actions/cart-action";

class CartController {
    async create(req: Request, res: Response) {
        try {
            const response = await CartAction.create(req);
            apiLogger.error(`[CartController] - create - body - ${JSON.stringify(req.body)}`);
            ResponseDto.httpSuccessResponse(res, 200, response);
        } catch (error) {
            apiLogger.error(`[CartController] - create - error - ${JSON.stringify(error)}`);
            ResponseDto.httpErrorResponse(res, error);
        }
    }
    async find(req: any, res: Response) {
        try {
            const response = await CartAction.find(req.user_id);
            apiLogger.error(`[CartController] - find - user_id - ${req.user_id}`);
            ResponseDto.httpSuccessResponse(res, 200, response);
        } catch (error) {
            apiLogger.error(`[CartController] - find - error - ${JSON.stringify(error)}`);
            ResponseDto.httpErrorResponse(res, error);
        }
    }

    async delete(req: any, res: Response) {
        try {
            const response = await CartAction.delete(req.user_id, req.params.id);
            apiLogger.error(`[CartController] - delete - user_id - ${req.user_id} ${req.params.id}`);
            ResponseDto.httpSuccessResponse(res, 200, response);
        } catch (error) {
            apiLogger.error(`[CartController] - delete - error - ${JSON.stringify(error)}`);
            ResponseDto.httpErrorResponse(res, error);
        }
    }
}

export default new CartController();