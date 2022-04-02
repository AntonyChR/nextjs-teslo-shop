import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';

type Data = 
    | { message: string } 
    | IProduct[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return searchProducts(req, res);
        default:
            return res.status(404).json({ message: 'Products not found' })

    }
}


async function searchProducts(req: NextApiRequest, res: NextApiResponse<Data>) {
    let { query = '' } = req.query;

    if (query.length === 0) {
        return res.status(400).json({ message: 'string is empty' })
    }
    query = query.toString().toLocaleLowerCase();
    await db.connect()
    const properties = 'title images price inStock slug -_id';
    const products = await Product.find({
        $text: { $search: query }
    }).select(properties).lean();

    await db.disconnect()
    return res.status(200).json(products)

}