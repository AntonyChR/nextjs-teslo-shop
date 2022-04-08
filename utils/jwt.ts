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