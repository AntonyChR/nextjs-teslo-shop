import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedDatabase } from '../../database'
import { Product, User } from '../../models'
import { encrypt, encryptObjectField } from '../../utils'

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
    const usersWidthEncrytedPassword = seedDatabase.initialData.users.map(user => encryptObjectField(user, 'password'));

    await User.insertMany(usersWidthEncrytedPassword);

    await db.disconnect();
    res.status(200).json({ message: 'database was restored' });
}