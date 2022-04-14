import bcrypt from 'bcryptjs';

import { db } from "."
import { User } from "../models";

export const checkUserEmailPassword = async(email:string,password:string) => {
    await db.connect();
    const user = await User.findOne({email}).lean();
    await db.disconnect();

    if(!user) return null;

    if(!bcrypt.compareSync(password,user.password!)) return null;

    return {
        _id  : user._id,
        name : user.name,
        email: email.toLocaleLowerCase(),
        role : user.role
    }
}

export const oAuthDbUser = async(oAuthEmail:string, oAuthName:string) =>{
    await db.connect();
    const user = await User.findOne({email:oAuthEmail}).lean();

    if(user){
        await db.disconnect();
        const {_id,name,email,role} = user;
        return {_id,name,email,role};
    }

    const newUser = new User({
        name    : oAuthName,
        email   : oAuthEmail,
        password: '@',
        role    : 'client'
    });

    await newUser.save();
    await db.disconnect();

    return {
        _id  : newUser._id,
        name : newUser.name,
        email: newUser.email,
        role : newUser.role
    }
}