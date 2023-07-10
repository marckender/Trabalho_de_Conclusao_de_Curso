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
class ProductAction {
    create(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, category, description, price } = req.body;
            const images = req.files;
            const product = Object.assign(Object.assign({}, req.body), { images: images === null || images === void 0 ? void 0 : images.map((image) => ({
                    filename: image.filename,
                    originalname: image.originalname,
                    path: image.path,
                    mimetype: image.mimetype,
                })) });
            if (!name || !category || !description || !price || !images.length) {
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
            return products.map((product) => (Object.assign(Object.assign({}, product.toObject()), { images: product.images.map((image) => ({
                    url: `${req.protocol}://${req.get('host')}/uploads/${image.filename}`
                })) })));
        });
    }
}
exports.default = new ProductAction();
//# sourceMappingURL=product-action.js.map