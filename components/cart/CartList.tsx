import { FC, useContext } from 'react';
import NextLink from 'next/link';
import { Box, Button, CardMedia, Grid, Link, Typography } from '@mui/material';
import { ItemCounter } from '../ui';
import { CartContext } from '../../context/cart';
import { ICartProduct, IOrderItem } from '../../interfaces';

interface Props {
    editable?: boolean;
    products?: IOrderItem[];
}

export const CartList: FC<Props> = ({ editable = false, products }) => {
    const { cart, updateCartQuantity, removeProductFromCart } = useContext(CartContext);
    const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
        product.quantity = newQuantityValue;
        updateCartQuantity(product);
    };
    const productsToShow = products ? products : cart;
    return (
        <>
            {productsToShow.map((product) => (
                <Grid container spacing={2} key={product.slug + product.size} sx={{ mb: 1 }}>
                    <Grid item xs={3}>
                        <NextLink href={`/product/${product.slug}`} passHref>
                            <Link>
                                <CardMedia
                                    image={product.image}
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
                                Talla: <strong>{product.size}</strong>
                            </Typography>
                            {editable ? (
                                <ItemCounter
                                    currentValue={product.quantity}
                                    maxValue={10}
                                    updatedQuantity={(value) => onNewCartQuantityValue(product as ICartProduct, value)}
                                />
                            ) : (
                                <Typography variant="h4">
                                    {product.quantity} unidad{product.quantity > 1 && 'es'}
                                </Typography>
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={2} display="flex" alignItems="center" flexDirection="column">
                        <Typography variant="subtitle1">{`$${product.price * product.quantity}`}</Typography>
                        {editable && (
                            <Button
                                variant="text"
                                color="secondary"
                                onClick={() => removeProductFromCart(product._id, product.size!)}
                            >
                                Remover
                            </Button>
                        )}
                    </Grid>
                </Grid>
            ))}
        </>
    );
};
