import { useContext, useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import Cookies from 'js-cookie';
import { Box, Button, Card, CardContent, Divider, Grid, Typography, Link, Chip } from '@mui/material';
import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';
import { CartContext } from '../../context';
import { countries } from '../../utils';

const SummaryPage = () => {
    const router = useRouter();
    const { shippingAdderss, numberOfItems, createOrder } = useContext(CartContext);

    const [isPosting, setIsPosting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if (!Cookies.get('firstName')) router.push('/checkout/address');
    }, [router]);
    if (!shippingAdderss) return <></>;
    const { address1, address2, phone, city, firstName, country, lastName, postalCode } = shippingAdderss;

    const onCreateOrder = async() => {
        setIsPosting(true);
        const {hasError, message}=await createOrder();
        if(hasError){
            setIsPosting(false);
            setErrorMessage(message);
            return;
        }
        router.replace(`/orders/${message}`);

    };
    return (
        <ShopLayout title="Resumen de compra" pageDescription="Resumen de compra">
            <Typography variant="h1" component="h1">
                Resumen
            </Typography>
            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className="summary-card" elevation={0}>
                        <CardContent>
                            <Typography variant="h2">
                                Resumen ({numberOfItems} Producto{numberOfItems >= 2 ? 's' : ''})
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="subtitle1">Dirección de entrega:</Typography>
                                <NextLink href="/checkout/address" passHref>
                                    <Link underline="always">Editar</Link>
                                </NextLink>
                            </Box>
                            <Typography>
                                {firstName}, {lastName}
                            </Typography>
                            <Typography>
                                {address1}, {postalCode}
                            </Typography>
                            <Typography>{city}</Typography>
                            {address2 && <Typography>{address2}</Typography>}
                            {/* <Typography>{countries.find(c=> c.code===country)?.name}</Typography> */}
                            <Typography>{country}</Typography>
                            <Typography>{phone}</Typography>
                            <Divider sx={{ my: 1 }} />
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="subtitle1">Información de productos</Typography>
                                <NextLink href="/cart" passHref>
                                    <Link underline="always">Editar</Link>
                                </NextLink>
                            </Box>
                            <OrderSummary />
                            <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                                <Button 
                                    onClick={onCreateOrder} 
                                    disabled={isPosting}
                                    color="secondary" 
                                    className="circular-btn" 
                                    fullWidth
                                >
                                    Confirmar orden
                                </Button>
                                <Chip
                                    color='error'
                                    label={errorMessage}
                                    sx={{display: errorMessage? 'flex':'none', mt:2}}
                                />

                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    );
};

export default SummaryPage;
