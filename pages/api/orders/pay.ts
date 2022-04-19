import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Order } from '../../../models';

type Data = {
    message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return payOrder(req, res);
        default:
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

const getPaypalBearerToken = async (): Promise<string | null> => {


    const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

    const base64Token = Buffer.from(`${PAYPAL_CLIENT}:${PAYPAL_SECRET}`,'utf-8').toString('base64');
    const body = new URLSearchParams('grant_type=client_credentials');

    try {
        const { data } = await axios.post(process.env.PAYPAL_OAUTH_URL || '', body, {
            headers: {
                Authorization: `Basic ${base64Token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })

        return data.access_token;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.response?.data);
        } else {
            console.log(error);
        }
        return null;
    }
}

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const paypalBearerToken = await getPaypalBearerToken();
    if(!paypalBearerToken){
        res.status(500).json({message: 'Error getting paypal bearer token'})
        return;
    }

    const {transactionId='', orderId=''} = req.body;

    const url = `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`

    const {data} = await axios.get(url,{
        headers: {
            'Authorization': `Bearer ${paypalBearerToken}`
        }
    })

    if(data.status !== 'COMPLETED'){
        res.status(500).json({message: 'Order not completed'})
        return;
    }

    await db.connect();
    const dbOrder = await Order.findById(orderId);
    if(!dbOrder){
        await db.disconnect();
        res.status(404).json({message: 'Order not found'})
        return;
    }

    const paypalTotalReported = Number(data.purchase_units[0].amount.value);
    if(paypalTotalReported !== Number(dbOrder.total)){
        console.log(typeof paypalTotalReported,' -  ',typeof dbOrder.total);
        await db.disconnect();
        res.status(500).json({message: 'Order total does not match'})
        return;
    }

    dbOrder.transactionId = transactionId;
    dbOrder.isPaid = true;
    dbOrder.save();
    db.disconnect();


    return res.status(200).json({ message: 'Order paid' });
}