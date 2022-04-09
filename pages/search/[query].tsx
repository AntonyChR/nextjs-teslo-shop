import type { GetServerSideProps, NextPage } from 'next';
import { Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';

import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';

interface Props {
    products: IProduct[];
    isProducts: boolean;
    query: string;
}
const SearchPage: NextPage<Props> = ({ products, isProducts, query }) => {
    return (
        <ShopLayout title="TESLO-Shop | search" pageDescription="Esta es una tienda">
            <Typography variant="h1" component="h1">
                Busqueda
            </Typography>
            {isProducts ? (
                <Typography variant="h2" sx={{ mb: 1 }}>
                    Productos encontrados relacionados con el termmino{' '}
                    <span style={{ fontWeight: 'bold' }}>&quot;{query}&quot;</span>
                </Typography>
            ) : (
                <Typography variant="h2" sx={{ mb: 1 }}>
                    No hay productos relacionados con <span style={{ fontWeight: 'bold' }}>&quot;{query}&quot;</span>, pero quiza
                    te interesen:
                </Typography>
            )}
            <ProductList products={products} />
        </ShopLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { query = '' } = params as { query: string };
    if (!query) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    let products = await dbProducts.getProductsByTerm(query);
    const isProducts = products.length > 0;

    // if products is empty
    if (!isProducts) {
        products = await dbProducts.getAllProducts();
    }

    return {
        props: { products, isProducts, query },
    };
};

export default SearchPage;
