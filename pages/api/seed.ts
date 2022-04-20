import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedDatabase } from '../../database'
import { Order, Product, User } from '../../models'

type Data = {
    message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    if (process.env.NODE_ENV === 'production') {
        return res.status(401).json({
            message: 'this endpoint is only available in development mode'
        })
    }

    await db.connect();

    //inser products
    await Product.deleteMany();
    await Product.insertMany(seedDatabase.initialData.products);

    //insert users
    await User.deleteMany();
    const usersWidthEncrytedPassword = seedDatabase.initialData.users;

    await User.insertMany(usersWidthEncrytedPassword);

    await Order.deleteMany();

    await db.disconnect();
    res.status(200).json({ message: 'database was restored' });
}