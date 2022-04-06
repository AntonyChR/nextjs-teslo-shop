import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';

import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui';
const SearchPage: NextPage = () => {
    const { products, isLoading } = useProducts('/products');

    return (
        <ShopLayout title="ICR-Shop | search" pageDescription="Esta es una tienda">
            <Typography variant="h1" component="h1">
                Busqueda
            </Typography>
            <Typography variant="h2" sx={{ mb: 1 }}>
                Productos encontrados
            </Typography>
            {isLoading ? <FullScreenLoading/> : <ProductList products={products} />}
            <ProductList products={products} />
        </ShopLayout>
    );
};

export default SearchPage;
