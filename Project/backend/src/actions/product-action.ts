// import { Response } from "express";
import * as express from "express"
import { Multer } from 'multer';

class ProductAction {
   async  create(req: any,) {
    const { name, category, price, description, discount, color, size } = req.body;
    const images = req.files as Express.Multer.File[];
        return {
            ...req.body,
            ...images
        }
    }
 
}

export default new ProductAction();