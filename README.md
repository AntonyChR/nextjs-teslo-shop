This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Settup project
```bash
npm install
```

rename .env.template to .env and add values


```
MONGO_URL=
JWR_SECRET_SEED=
NEXTAUTH_SECRET=

GITHUB_ID=
GITHUB_SECRET=

NEXT_PUBLIC_TAX_RATE=0.15

NEXT_PUBLIC_PAYPAL_CLIENT_ID=
PAYPAL_SECRET=

PAYPAL_OAUTH_URL=
PAYPAL_ORDERS_URL=

CLOUDINARY_URL=

```

## Start project
run the development server:

```bash
docker compose up -d
npm run dev

```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



