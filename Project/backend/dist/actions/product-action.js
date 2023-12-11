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
const api_error_1 = require("../utils/api-error");
const product_repository_1 = require("../repositories/product-repository");
const category_actions_1 = require("./category-actions");
class ProductAction {
    find(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_repository_1.default.findById(req.params.id);
            if (!product) {
                throw new api_error_1.default("Product Not Found", 500);
            }
            return Object.assign({}, product.toObject());
        });
    }
    create(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, price, category_id } = req.body;
            const images = req.files;
            const searchCategory = yield category_actions_1.default.findById(category_id);
            if (!searchCategory) {
                throw new api_error_1.default("you need to fill an correct category_id", 500);
            }
            const product = Object.assign(Object.assign({}, req.body), { category: category_id, images: images === null || images === void 0 ? void 0 : images.map((image) => (image.firebaseUrl)) });
            if (!name || !category_id || !description || !price || !images.length) {
                throw new api_error_1.default("you need to fill in these mandatory information", 500);
            }
            else {
                return product_repository_1.default.create(product);
            }
        });
    }
    findAll(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield product_repository_1.default.find();
            return products.map((product) => (Object.assign({}, product.toObject())));
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_repository_1.default.findById(id);
            if (!product) {
                throw new api_error_1.default("Product Not Found", 500);
            }
            return yield product_repository_1.default.findByIdAndRemove(id);
        });
    }
}
exports.default = new ProductAction();
//# sourceMappingURL=product-action.js.map