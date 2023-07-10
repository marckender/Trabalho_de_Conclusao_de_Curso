import { Response } from "express";

class ProductAction {
   async  create(req: any, res: Response<any, Record<string, any>>) {
    console.log("body", req.body)
    console.log("files", req.files)
        return {
            ...req.body,
            ...req.files
        }
    }
 
}

export default new ProductAction();