import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Order, Product, User } from '../../../models';

type Data = {
    numberOfOrders: number;
    paidOrders: number;
    notPaidOrders: number;
    numberOfClients: number;
    numberOfProducts: number;
    productsWidthNoInventory: number;
    lowInventory: number;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getDbInfo(req, res);
        default:
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

const getDbInfo = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    db.connect();

    const [
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWidthNoInventory,
        lowInventory

    ] = await Promise.all([
        Order.count(),
        Order.find({ isPaid: true }).count(),
        User.find({ role: 'client' }).count(),
        Product.count(),
        Product.find({ inStock: 0 }).count(),
        Product.find({ inStock: { $lte: 10 } }).count(),
    ])
    db.disconnect();

    return res.status(200).json({
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWidthNoInventory,
        lowInventory,
        notPaidOrders: numberOfOrders - paidOrders

    })
}
