import NextLink from 'next/link';
import { Box , Card, CardContent, Divider, Grid, Typography, Link, Chip } from '@mui/material';
import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

const OrderPage = () => {
    return (
        <ShopLayout title="Resume de orden N° 12334" pageDescription="Ejecutar compra">
            <Typography variant="h1" component="h1">
                Orden N° 12334
            </Typography>
            {/* <Chip sx={{my:2}} label="Pendiente de pago" variant='outlined' color='error' icon ={<CreditCardOffOutlined/>}/> */}
            <Chip sx={{ my: 2 }} label="Pagada" variant="outlined" color="success" icon={<CreditScoreOutlined />} />
            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className="summary-card" elevation={0}>
                        <CardContent>
                            <Typography variant="h2">Resumen (3 Productos)</Typography>
                            <Divider sx={{ my: 1 }} />
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="subtitle1">Dirección de entrega:</Typography>
                                <NextLink href="/checkout/address" passHref>
                                    <Link underline="always">Editar</Link>
                                </NextLink>
                            </Box>
                            <Typography>Nombre:</Typography>
                            <Typography>Lugar</Typography>
                            <Typography>Aqui</Typography>
                            <Typography>Aqui</Typography>
                            <Typography>Aqui</Typography>
                            <Typography>+51 987654321</Typography>
                            <Divider sx={{ my: 1 }} />
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="subtitle1">Información de productos</Typography>
                                <NextLink href="/cart" passHref>
                                    <Link underline="always">Editar</Link>
                                </NextLink>
                            </Box>
                            <OrderSummary />
                            <Box sx={{ mt: 3 }}>
                                <h1>Pagar</h1>
                                <Chip
                                    sx={{ my: 2 }}
                                    label="Pagada"
                                    variant="outlined"
                                    color="success"
                                    icon={<CreditScoreOutlined />}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    );
};

export default OrderPage;
