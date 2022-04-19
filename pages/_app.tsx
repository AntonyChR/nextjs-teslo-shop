import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { SessionProvider } from 'next-auth/react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '../themes';
import { UiProvider, CartProvider, AuthProvider } from '../context';

function MyApp({ Component, pageProps }: AppProps) {
    const fetcher = (resource: any, init: any) => fetch(resource, init).then((res) => res.json());
    const CLIENT_ID=process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    return (
        <SessionProvider>
            <PayPalScriptProvider options={{'client-id':CLIENT_ID!}}>
                <SWRConfig value={{ fetcher }}>
                    <AuthProvider>
                        <CartProvider>
                            <UiProvider>
                                <ThemeProvider theme={lightTheme}>
                                    <CssBaseline />
                                    <Component {...pageProps} />
                                </ThemeProvider>
                            </UiProvider>
                        </CartProvider>
                    </AuthProvider>
                </SWRConfig>
            </PayPalScriptProvider>
        </SessionProvider>
    );
}

export default MyApp;
