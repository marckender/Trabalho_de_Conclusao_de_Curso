import ApiError from "../utils/api-error";
import ProductRepository from "../repositories/product-repository";
import CategoryActions from "./category-actions";

class ProductAction {
  async find(req: any) {
    const product = await ProductRepository.findById(req.params.id);
    if(!product) {
        throw new ApiError(
            "Product Not Found",
            500
        );
    }
    return{
        ...product.toObject()
    }

  }
 
   async  create(req: any,) {
    const { name, description, price, category_id } = req.body;

    const images = req.files;

    const searchCategory = await CategoryActions.findById(category_id)

    if(!searchCategory) {
        throw new ApiError(
            "you need to fill an correct category_id",
            500
        );
    }
    const product = {
        ...req.body,
        category: category_id,
        images: images?.map((image) => (image.firebaseUrl)),
    }

        if(!name || !category_id || !description ||!price || !images.length) {
            throw new ApiError(
                "you need to fill in these mandatory information",
                500
            );
        } else {
            return ProductRepository.create(product);
        }
    }

    async findAll(req: any) {
        const products = await ProductRepository.find();
        return products.map((product) =>({
            ...product.toObject()

        }))
    }

    async delete(id: string) {
        const product = await ProductRepository.findById(id);
        if(!product) {
            throw new ApiError(
                "Product Not Found",
                500
            );
        }
        return await ProductRepository.findByIdAndRemove(id)
    }
 
}

export default new ProductAction();