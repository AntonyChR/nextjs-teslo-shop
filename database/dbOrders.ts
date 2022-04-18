import { isValidObjectId } from 'mongoose';
import { db } from '.';
import { IOrder, IOrdersHistory } from "../interfaces";
import { Order } from '../models';

export const getOrderById = async (id: string): Promise<IOrder | null> => {
    if (!isValidObjectId(id)) {
        return null
    }
    await db.connect();

    const order = await Order.findById(id).lean();
    await db.disconnect();

    if(!order){
        return null;
    }

    return JSON.parse(JSON.stringify(order));

}


export const getOrdersByUserId = async (userId: string):Promise<IOrdersHistory[]> =>{
    
    if(!isValidObjectId(userId)){
        return [];
    }
    await db.connect();
    const orders = await Order.find({user:userId},{isPaid:1,shippingAddress:{firstName:1, lastName:1}});
    await db.disconnect();
    return JSON.parse(JSON.stringify(orders))
}