import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { db } from '../../../database'
import { IOrder } from '../../../interfaces'
import { Order, Product } from '../../../models'

type Data = 
    |{message: string}
    |IOrder

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return createOrder(req, res)
        default:
            return res.status(405).json({ message: 'Method Not Allowed' });
    }
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {orderItems, total} = req.body as IOrder;
    
    const session:any = await getSession({req})

    if(!session) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const productIds = orderItems.map(p=>p._id);

    await db.connect();
    
    const dbProducts = await Product.find({_id:{$in: productIds}});

    try{
        const subTotalFromdb = orderItems.reduce((acc, current) => { 
            const currentPrice = dbProducts.find(p=>p.id === current._id)?.price;
            if(!currentPrice) throw new Error('verify the product');
            return acc + (current.quantity * currentPrice);
        },0);

        const TAX_RATE = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

        const backendTotal = subTotalFromdb * (TAX_RATE + 1 );
        console.log(backendTotal ,'--', total)
        if(Math.ceil(total) !== Math.ceil(backendTotal)) {
            throw new Error('the value of the quantities is inconsistent');
        }

        const userId = session.user._id;
        console.log('user DI:' , userId)
        const newOrder = new Order({
            ...req.body, isPaid:false,user:userId
        })
        newOrder.total = Math.round(newOrder.total*100)/100;
        await newOrder.save();
        db.disconnect();
        
        return res.status(201).json(newOrder)


    }catch(error:any){
        await db.disconnect();
        console.log(error)
        res.status(400).json({message:error.message || ''})
    }
    
}