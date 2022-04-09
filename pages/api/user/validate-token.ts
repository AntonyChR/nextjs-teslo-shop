import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '../../../database';
import { User } from '../../../models';
import { jwt } from '../../../utils';

type Data =
    | { message: string }
    | { user: { name: string, email: string, role: string }, token: string }
    | any

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return checkJWT(req, res);
        default:
            res.status(400).json({ message: 'method not allowed' });
    }
}

async function checkJWT(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { token = '' } = req.cookies;

    let userId = '';
    try {
        userId = await jwt.isValidToken(token);
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    await db.connect();
    const user = await User.findById(userId).lean();
    await db.disconnect();
    
    if (!user) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    const { name, email, role,_id } = user;

    const newToken = jwt.signToken(_id, email);

    res.status(200).json({
        token: newToken,
        user: { name, email, role },
        message: 'revalidated token'
     });

}