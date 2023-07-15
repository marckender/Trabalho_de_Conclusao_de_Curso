import * as express from "express"
import { Multer } from 'multer';
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
        ...product.toObject(),
        images: product.images.map((image) => `${req.protocol}://${req.get('host')}/uploads/${image.filename}`)
    }

  }
 
   async  create(req: any,) {
    const { name, category, description, price } = req.body;
    const images = req.files as Express.Multer.File[];
        const product = {
            ...req.body,
            images: images?.map((image) => ({
                filename: image.filename,
                originalname: image.originalname,
                path: image.path,
                mimetype: image.mimetype,
            })),
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
            ...product.toObject(),
            images: product.images.map((image) => `${req.protocol}://${req.get('host')}/uploads/${image.filename}`)

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