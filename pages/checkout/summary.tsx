import { useContext } from 'react';
import NextLink from 'next/link';
import { Box, Button, Card, CardContent, Divider, Grid, Typography, Link } from '@mui/material';
import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';
import { CartContext } from '../../context';
import { countries } from '../../utils';

const SummaryPage = () => {
    const { shippingAdderss,numberOfItems} = useContext(CartContext);
    if(!shippingAdderss) return <></>;
    const { address1, address2, phone, city, firstName, country, lastName, postalCode } = shippingAdderss;
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
                            <Typography variant="h2">Resumen ({numberOfItems} Producto{numberOfItems>=2?'s':''})</Typography>
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
                            <Typography>{countries.find(c=> c.code===country)?.name}</Typography>
                            <Typography>{phone}</Typography>
                            <Divider sx={{ my: 1 }} />
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="subtitle1">Información de productos</Typography>
                                <NextLink href="/cart" passHref>
                                    <Link underline="always">Editar</Link>
                                </NextLink>
                            </Box>
                            <OrderSummary />
                            <Box sx={{ mt: 3 }}>
                                <Button color="secondary" className="circular-btn" fullWidth>
                                    Confirmar orden
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    );
};

export default SummaryPage;
