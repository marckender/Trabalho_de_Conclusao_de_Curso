"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_dto_1 = require("../dtos/response.dto");
const api_logger_1 = require("../utils/api-logger");
const product_action_1 = require("../actions/product-action");
class ProductController {
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                api_logger_1.default.info(`[ProductController] - find - id => ${req.params.id}`);
                const response = yield product_action_1.default.find(req);
                response_dto_1.default.httpSuccessResponse(res, 201, response);
            }
            catch (error) {
                api_logger_1.default.info(`[ProductController] - find - error => ${error}`);
                response_dto_1.default.httpErrorResponse(res, error);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                api_logger_1.default.info(`[ProductController] - delete - id => ${req.params.id}`);
                const response = yield product_action_1.default.delete(req.params.id);
                response_dto_1.default.httpSuccessResponse(res, 201, response);
            }
            catch (error) {
                api_logger_1.default.info(`[ProductController] - delete - error => ${error}`);
                response_dto_1.default.httpErrorResponse(res, error);
            }
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield product_action_1.default.findAll(req);
                // apiLogger.info(`[ProductController] - findAll - products => ${JSON.stringify(response)}`);
                response_dto_1.default.httpSuccessResponse(res, 201, response);
            }
            catch (error) {
                api_logger_1.default.info(`[ProductController] - findAll - error => ${error}`);
                response_dto_1.default.httpErrorResponse(res, error);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                api_logger_1.default.info(`[ProductController] - create - req.body => ${JSON.stringify(req.body)}`);
                api_logger_1.default.info(`[ProductController] - create - req.body => ${JSON.stringify(req.files)}`);
                const response = yield product_action_1.default.create(req);
                response_dto_1.default.httpSuccessResponse(res, 201, response);
            }
            catch (error) {
                api_logger_1.default.info(`[ProductController] - create - error => ${error}`);
                response_dto_1.default.httpErrorResponse(res, error);
            }
        });
    }
}
exports.default = new ProductController();
//# sourceMappingURL=product-controller.js.map