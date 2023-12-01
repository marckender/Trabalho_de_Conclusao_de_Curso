import categoryRepository from "../repositories/category-repository";
import ApiError from "../utils/api-error";

class CategoryAction {
    async create(body: any) {
        const category_name = body.name
        try {
            
            const ifCategoryExist = await categoryRepository.findOne({ name: category_name });
            if (ifCategoryExist) {
              throw new ApiError("Category already exists !", 500);
            }
            return await categoryRepository.create(body);
        } catch (error) {
            throw new ApiError(
                error.message,
                500
            );
        }
    }

    async findAll() {
        return await categoryRepository.find();
    }

    async delete(categoryId: string) {
        const ifCategoryExist = await categoryRepository.findById(categoryId);
        if (ifCategoryExist) {
            return await categoryRepository.findByIdAndRemove(categoryId);
        }
        throw new ApiError("Category not Exists!", 500);
      }
}

export default new CategoryAction();