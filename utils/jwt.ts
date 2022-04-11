import jwt from 'jsonwebtoken';

export const signToken = (_id: string, email: string) => {
    const SECRET_SEED = process.env.JWR_SECRET_SEED;
    if (!SECRET_SEED) {
        throw new Error('error getting seed');
    }
    const payload = { _id, email };
    const options = { expiresIn: '30d' };

    return jwt.sign(payload, SECRET_SEED, options);
}


export const isValidToken = (token: string): Promise<string> => {
    const SECRET_SEED = process.env.JWR_SECRET_SEED;
    if (!SECRET_SEED) {
        throw new Error('error getting seed');
    }

    if (token.length <= 10) {
        return Promise.reject('token is not valid');
    }

    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, SECRET_SEED || '', (error, payload) => {
                if (error) return reject('Invalid token');
                const { _id } = payload as { _id: string };
                resolve(_id);
            });
        } catch (error) {
            console.log(error)
            reject('Invalid token');
        }
    })

}