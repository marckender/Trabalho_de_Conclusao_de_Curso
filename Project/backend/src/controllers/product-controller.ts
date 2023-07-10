import { Request, Response } from 'express';
import ResponseDto from "../dtos/response.dto";
import apiLogger from "../utils/api-logger";
import productAction from "../actions/product-action";

class ProductController {
    async findAll(req, res) {
      try {
        const response = await productAction.findAll(req);
        apiLogger.info(`[ProductController] - findAll - products => ${JSON.stringify(response)}`);
        ResponseDto.httpSuccessResponse(res, 201, response);
      } catch (error) {
        apiLogger.info(`[ProductController] - findAll - error => ${error}`);
        ResponseDto.httpErrorResponse(res, error);
      }
    }
    async create(req: any, res: Response) {
        try {
            apiLogger.info(`[ProductController] - create - req.body => ${JSON.stringify(req.body)}`);
            apiLogger.info(`[ProductController] - create - req.body => ${JSON.stringify(req.files)}`);
            const response = await productAction.create(req);
            ResponseDto.httpSuccessResponse(res, 201, response);
          } catch (error) {
            apiLogger.info(`[ProductController] - create - error => ${error}`);
            ResponseDto.httpErrorResponse(res, error);
          }
    }
}

export default new ProductController();