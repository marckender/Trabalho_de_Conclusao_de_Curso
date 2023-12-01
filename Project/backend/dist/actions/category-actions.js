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
const category_repository_1 = require("../repositories/category-repository");
const api_error_1 = require("../utils/api-error");
class CategoryAction {
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const category_name = body.name;
            try {
                const ifCategoryExist = yield category_repository_1.default.findOne({ name: category_name });
                if (ifCategoryExist) {
                    throw new api_error_1.default("Category already exists !", 500);
                }
                if (!category_name.trim()) {
                    throw new api_error_1.default("Category name is required !", 500);
                }
                return yield category_repository_1.default.create({
                    name: category_name,
                    SLUG: category_name === null || category_name === void 0 ? void 0 : category_name.toUpperCase()
                });
            }
            catch (error) {
                throw new api_error_1.default(error.message, 500);
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield category_repository_1.default.find();
        });
    }
    delete(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const ifCategoryExist = yield category_repository_1.default.findById(categoryId);
            if (ifCategoryExist) {
                return yield category_repository_1.default.findByIdAndRemove(categoryId);
            }
            throw new api_error_1.default("Category not Exists!", 500);
        });
    }
    update(_id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const category_name = body.name;
            const ifExist = yield category_repository_1.default.findById(_id);
            if (ifExist) {
                if (!category_name.trim()) {
                    throw new api_error_1.default("Category name is required !", 500);
                }
                return yield category_repository_1.default.findByIdAndUpdate(_id, {
                    name: category_name,
                    SLUG: category_name === null || category_name === void 0 ? void 0 : category_name.toUpperCase(),
                    updatedAt: new Date(),
                });
            }
            throw new api_error_1.default("Category not found!", 500);
        });
    }
}
exports.default = new CategoryAction();
//# sourceMappingURL=category-actions.js.map