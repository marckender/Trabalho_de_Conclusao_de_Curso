import * as express from "express"
import { Multer } from 'multer';
import ApiError from "../utils/api-error";
import ProductRepository from "../repositories/product-repository";
import { Request, Response } from 'express';


class ProductAction {
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
            images: product.images.map((image) => ({
                url:`${req.protocol}://${req.get('host')}/uploads/${image.filename}`
            }))

        }))
    }
 
}

export default new ProductAction();