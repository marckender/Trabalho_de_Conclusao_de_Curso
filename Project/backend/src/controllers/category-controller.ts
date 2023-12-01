import { Request, Response } from "express";
import ResponseDto from "../dtos/response.dto";
import apiLogger from "../utils/api-logger";
import categoryActions from "../actions/category-actions";

class CategoryController {
    async create(req: Request, res: Response) {
        try {
            const response = await categoryActions.create(req.body);
            apiLogger.error(`[CategoryController] - create - body - ${JSON.stringify(req.body)}`);
            ResponseDto.httpSuccessResponse(res, 200, response);
        } catch (error) {
            apiLogger.error(`[CategoryController] - create - error - ${JSON.stringify(error)}`);
            ResponseDto.httpErrorResponse(res, error);
        }
    }
}

export default new CategoryController();