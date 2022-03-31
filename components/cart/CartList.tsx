import { FC } from 'react';
import NextLink from 'next/link';
import { Box, Button, CardMedia, Grid, Link, Typography } from '@mui/material';
import { initialData } from '../../database/products';
import { ItemCounter } from '../ui';

interface Props {}

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
    initialData.products[3],
];
export const CartList: FC<Props> = () => {
    return (
        <>
            {productsInCart.map((product) => (
                <Grid container spacing={2} key={product.slug} sx={{ mb: 1 }}>
                    <Grid item xs={3}>
                        <NextLink href={`/product/slug`} passHref>
                            <Link>
                                <CardMedia
                                    image={`/products/${product.images[0]}`}
                                    component="img"
                                    sx={{ borderRadius: '5px' }}
                                />
                            </Link>
                        </NextLink>
                    </Grid>
                    <Grid item xs={7}>
                        <Box display="flex" flexDirection="column">
                            <Typography variant="body1">{product.title}</Typography>
                            <Typography variant="body1">
                                Talla:<strong>M</strong>
                            </Typography>
                            <ItemCounter />
                        </Box>
                    </Grid>
                    <Grid item xs={2} display="flex" alignItems="center" flexDirection="column">
                        <Typography variant="subtitle1">{`$${product.price}`}</Typography>
                        <Button variant="text" color="secondary">
                            Remover
                        </Button>
                    </Grid>
                </Grid>
            ))}
        </>
    );
};
