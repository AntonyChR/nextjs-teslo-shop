import type { NextApiRequest, NextApiResponse } from 'next'
import {isValidObjectId} from 'mongoose';
import {v2 as cloudinary} from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL || '');
import { db } from '../../../database';
import { IProduct } from '../../../interfaces'
import { Product } from '../../../models';

type Data = 
| {message: string}
| IProduct[] 
| IProduct

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch(req.method){
        case 'GET':
            return getProducts(req, res);
        case 'PUT':
            return updateProducts(req,res);
        case 'POST':
            return createProduct(req,res);
        default:
            return res.status(405).json({ message: 'Method Not Allowed' })
    }
}

const createProduct =async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {images = []} = req.body as IProduct;
    if(images.length < 2){
        return res.status(400).json({message: 'at least two images are required'})
    }


    try{
        await db.connect()
        const productInDb = await Product.findOne({slug: req.body.slug})
        if(productInDb){
            await db.disconnect()
            return res.status(400).json({message: 'Product is already exist'})
        }

        const product = new Product(req.body);
        await product.save();
        await db.disconnect()
        res.status(200).json(product);
        

    }catch(error){
        console.log(error)
        await db.disconnect()
        return res.status(400).json({message:'there was an error creating the product'})
    }

    
}

const  getProducts = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    await db.connect();
    const products = await Product.find().sort({ title:'asc'}).lean();
    await db.disconnect();
    const updatedProducts = products.map(product => {
        product.images = product.images.map(image => {
            return image.includes('http') ? image : `${process.env.HOST_NAME}/products/${image}`
        })
        return product;
    })
    res.status(200).json(updatedProducts);
}

const updateProducts =async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {_id='', images = []} = req.body as IProduct;
    if(!isValidObjectId(_id)){
        return res.status(400).json({message: 'Invalid product ID'})
    }

    if(images.length < 2){
        return res.status(400).json({message: 'at least two images are required'})
    }

    try{
        await db.connect();
        const product = await Product.findById(_id);
        if(!product){
            await db.disconnect();
            return res.status(400).json({message:'Product not found'})
        }


        product.images.forEach(async (image)=>{
            if(!images.includes(image)){
                const [fileId, extension] = image.substring(image.lastIndexOf('/')+1).split('.');
                await cloudinary.uploader.destroy(fileId);
            }
        });

        await product.update(req.body);
        await db.disconnect();

        return res.status(200).json(product)


    }catch(error){
        console.log(error)
        await db.disconnect();
        return res.status(400).json({message: 'error '})
    }


}