import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest | any, ev: NextFetchEvent) {

    const session: any = await getToken({req, secret: process.env.NEXTAUTH_SECRET});

    const badResponse = new Response(JSON.stringify({error: 'Unauthorized'}), {
        status: 401,
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(!session){
        return badResponse;
    }

    const allowed = ['admin'];
    
    const isAuthorized = allowed.includes(session.user.role);
    if(isAuthorized === false){
        return badResponse;
    }
    return NextResponse.next();

}