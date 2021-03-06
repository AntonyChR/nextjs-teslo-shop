import type { NextApiRequest, NextApiResponse } from 'next'
import { db, SHOP_CONSTANTS } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';

type Data =
    | { message: string }
    | IProduct[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getProducts(req, res);
        default:
            return res.status(401).json({
                message: 'cannot process the request'
            })
    }
}


async function getProducts(req: NextApiRequest, res: NextApiResponse<Data>) {

    const {gender = 'all'}  = req.query;
    let condition = {}
    if(gender!== 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender}`)){
        condition = {gender}
    }
    await db.connect();
    const properties  = 'title images price inStock slug -_id'
    const products = await Product.find(condition).select(properties).lean();
    await db.disconnect();
    const updatedProducts = products.map(product => {
        product.images = product.images.map(image => {
            return image.includes('http') ? image : `${process.env.HOST_NAME}/products/${image}`
        })
        return product;
    })
    return res.status(200).json(updatedProducts);
}