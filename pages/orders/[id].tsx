import NextLink from 'next/link';
import { NextPage } from 'next';

import { IOrder } from '../../interfaces';

import { Box, Card, CardContent, Divider, Grid, Typography, Link, Chip } from '@mui/material';
import { CartList, OrderSummary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

interface Props {
    order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
    const { shippingAddress } = order;
    return (
        <ShopLayout title="Resume de orden N° 12334" pageDescription="Ejecutar compra">
            <Typography variant="h1" component="h1">
                Orden N° 12334
            </Typography>
            {order.isPaid ? (
                <Chip sx={{ my: 2 }} label="Pagada" variant="outlined" color="success" icon={<CreditScoreOutlined />} />
            ) : (
                <Chip
                    sx={{ my: 2 }}
                    label="Pendiente de pago"
                    variant="outlined"
                    color="error"
                    icon={<CreditCardOffOutlined />}
                />
            )}
            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList products={order.orderItems} />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className="summary-card" elevation={0}>
                        <CardContent>
                            <Typography variant="h2">
                                Resumen ({order.numberOfItems} Producto{order.numberOfItems >= 2 ? 's' : ''})
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="subtitle1">Dirección de entrega:</Typography>
                                <NextLink href="/checkout/address" passHref>
                                    <Link underline="always">Editar</Link>
                                </NextLink>
                            </Box>
                            <Typography>Nombre:</Typography>
                            <Typography>
                                {shippingAddress.firstName} {shippingAddress.lastName}
                            </Typography>
                            <Typography>
                                {shippingAddress.address1} {shippingAddress.address2 && `${shippingAddress.address2}`}
                            </Typography>
                            <Typography>
                                {shippingAddress.city} {shippingAddress.postalCode}
                            </Typography>
                            <Typography>{shippingAddress.phone}</Typography>
                            <Divider sx={{ my: 1 }} />

                            <OrderSummary
                                orderValues={{
                                    numberOfItems: order.numberOfItems,
                                    tax: order.tax,
                                    subTotal: order.subTotal,
                                    total: order.total,
                                }}
                            />
                            <Box sx={{ mt: 3 }}>
                                {order.isPaid ? (
                                    <Chip
                                        sx={{ my: 2 }}
                                        label="Pagada"
                                        variant="outlined"
                                        color="success"
                                        icon={<CreditScoreOutlined />}
                                    />
                                ) : (
                                    <h1>Pagar</h1>
                                )}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { dbOrders } from '../../database';

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const { id = '' } = query;

    const session: any = await getSession({ req });

    if (!session) {
        return {
            redirect: {
                destination: `/auth/login?p=orders/${id}`,
                permanent: false,
            },
        };
    }

    const order = await dbOrders.getOrderById(id.toString());

    if (!order) {
        return {
            redirect: {
                destination: `/orders/history`,
                permanent: false,
            },
        };
    }

    if (order.user !== session.user._id) {
        return {
            redirect: {
                destination: `/orders/history`,
                permanent: false,
            },
        };
    }
    return {
        props: {
            order,
        },
    };
};

export default OrderPage;
