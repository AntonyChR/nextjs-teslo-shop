import { Box } from '@mui/material';
import Head from 'next/head';
import { FC } from 'react';

interface Props {
    title: string;
}

export const AuthLayout: FC<Props> = ({ title, children }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <main style={{height:'100vh',display:'flex', justifyContent:'center', alignItems:'center'}}>{children}</main>
        </>
    );
};
