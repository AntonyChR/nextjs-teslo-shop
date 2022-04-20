import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest | any, ev: NextFetchEvent) {

    const session: any = await getToken({req, secret: process.env.NEXTAUTH_SECRET});

    if(!session){
        const {origin,pathname} = req.nextUrl.clone();
        const url = `${origin}/auth/login?p=${pathname}`;
        return NextResponse.redirect(url);
    }

    const allowed = ['admin'];
    
    const isAuthorized = allowed.includes(session.user.role);
    if(isAuthorized === false){
        return NextResponse.redirect('/404');
    }
    return NextResponse.next();

}