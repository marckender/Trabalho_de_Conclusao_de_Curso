import * as express from "express"

import ApiError from "../utils/api-error";
import ProductRepository from "../repositories/product-repository";
import { Request } from 'express';

class ProductAction {
  async find(req: Request) {
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
    const { name, category, description, price } = req.body;

    const images = req.files;
    const product = {
        ...req.body,
        images: images?.map((image) => (image.firebaseUrl)),
    }

        if(!name || !category || !description ||!price || !images.length) {
            throw new ApiError(
                "you need to fill in these mandatory information",
                500
            );
        } else {
            return ProductRepository.create(product);
        }
    }

    async findAll(req: Request) {
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