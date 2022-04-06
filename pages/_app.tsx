import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '../themes';
import { UiProvider } from '../context';
import { CartProvider } from '../context/cart';

function MyApp({ Component, pageProps }: AppProps) {
    const fetcher = (resource: any, init: any) => fetch(resource, init).then((res) => res.json());
    return (
        <SWRConfig value={{ fetcher }}>
            <CartProvider>
                <UiProvider>
                    <ThemeProvider theme={lightTheme}>
                        <CssBaseline />
                        <Component {...pageProps} />
                    </ThemeProvider>
                </UiProvider>
            </CartProvider>
        </SWRConfig>
    );
}

export default MyApp;
