import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs';

import { db } from '../../../database';
import { User } from '../../../models';
import { encrypt, jwt, validations } from '../../../utils';

type Data =
    | { message: string }
    | { user: { name: string, email: string, role: string }, token: string }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return registerUser(req, res);
        default:
            res.status(400).json({ message: 'method not allowed' });
    }
}

async function registerUser(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { email = '', password = '', name = '' } = req.body as { email: string, password: string, name: string };
    
    const {isValidData,validationMessage} = validations.newUserDataValidation({email,password,name});
    
    if(!isValidData){
        return res.status(400).json({ message: validationMessage });
    }

    await db.connect();
    const user = await User.findOne({ email });

    if (user) {
        db.disconnect();
        return res.status(400).json({ message: ` the mail ${email} is already in use` });
    }

    const newUser = new User({
        email: email.toLocaleLowerCase(),
        password: encrypt(password),
        name,
        role: 'client'
    })

    try {
        await newUser.save({ validateBeforeSave: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'error registering user' });
    }

    db.disconnect();

    const { role, _id } = newUser;
    const token = jwt.signToken(_id, email);

    return res.status(200).json(
        {
            token: token,
            user: { name, role, email }
        }
    );

}