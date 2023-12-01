import { Request, Response } from "express";
import ResponseDto from "../dtos/response.dto";
import apiLogger from "../utils/api-logger";
import CategoryActions from "../actions/category-actions";

class CategoryController {

    async create(req: Request, res: Response) {
        try {
            const response = await CategoryActions.create(req.body);
            apiLogger.error(`[CategoryController] - create - body - ${JSON.stringify(req.body)}`);
            ResponseDto.httpSuccessResponse(res, 200, response);
        } catch (error) {
            apiLogger.error(`[CategoryController] - create - error - ${JSON.stringify(error)}`);
            ResponseDto.httpErrorResponse(res, error);
        }
    }

    async findAll(req, res) {
        try {
          const response = await CategoryActions.findAll();
          apiLogger.info(`[CategoryController] - findAll - response => ${JSON.stringify(response)}`);
          ResponseDto.httpSuccessResponse(res, 201, response);
        } catch (error) {
          apiLogger.info(`[CategoryController] - findAll - error => ${error}`);
          ResponseDto.httpErrorResponse(res, error);
        }
    }

    async delete(req, res) {
        try {
          apiLogger.info(`[CategoryController] - delete - CategoryID => ${req.params.id}`);
          const response = await CategoryActions.delete(req.params.id);
          ResponseDto.httpSuccessResponse(res, 201, response);
        } catch (error) {
          apiLogger.error(
            `[CategoryController] - deleteCategory - error => ${JSON.stringify(error)}`
          );
          ResponseDto.httpErrorResponse(res, error);
        }
    }

    async update(req, res) {
        try {
            const response = await CategoryActions.update(req.params.id, req.body);
            ResponseDto.httpSuccessResponse(res, 201, response);
          } catch (error) {
            ResponseDto.httpErrorResponse(res, error);
          }
    }

    
}

export default new CategoryController();