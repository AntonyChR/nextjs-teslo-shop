import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest | any, ev: NextFetchEvent) {
    /*     const {token} = req.cookies;
    
        try{
            await jwt.isValidToken(token);
            return NextResponse.next();
        }catch(error){
            const {origin,pathname} = req.nextUrl.clone();
            const url = `${origin}/auth/login?p=${pathname}`;
            return NextResponse.redirect(url);
        } */
    const session = await getToken({req, secret: process.env.NEXTAUTH_SECRET});

    if(!session){
        const {origin,pathname} = req.nextUrl.clone();
        const url = `${origin}/auth/login?p=${pathname}`;
        return NextResponse.redirect(url);
    }
    return NextResponse.next();

}