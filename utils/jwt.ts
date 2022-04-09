import jwt from 'jsonwebtoken';

export const signToken = (_id: string, email: string) => {
    const SEED = process.env.JWR_SECRET_SEED;
    if (!SEED) {
        throw new Error('error getting seed');
    }
    const payload = { _id, email };
    const options = { expiresIn: '30d' };
    
    return jwt.sign(payload, SEED, options);
}


export const isValidToken = (token:string):Promise<string> => {
    const SEED = process.env.JWR_SECRET_SEED;
    if (!SEED) {
        throw new Error('error getting seed');
    }

    return new Promise((resolve, reject) => {
        try{
            jwt.verify(token,SEED||'',(error,payload)=>{
                if(error) return reject('Invalid token');
                const {_id} = payload as {_id:string};
                resolve(_id);
            }) ;
        }catch(error){
            console.log(error)
            reject('Invalid token');
        }
    })
    
}