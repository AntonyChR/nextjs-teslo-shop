import NextLink from 'next/link';
import { NextPage } from 'next';

import { Box, Card, CardContent, Divider, Grid, Typography, Link, Chip, CircularProgress } from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

import { CartList, OrderSummary } from '../../../components/cart';
import { ShopLayout } from '../../../components/layouts';
import { IOrder } from '../../../interfaces';

interface Props {
    order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
    const { shippingAddress } = order;

    return (
        <ShopLayout title={`Order: ${order._id!.slice(0, 8)}...`} pageDescription="Ejecutar compra">
            <Typography variant="h1" component="h1">
                Orden N° {order._id}
            </Typography>

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
                                <Box display="flex" flexDirection="column">
                                    {order.isPaid ? (
                                        <Chip
                                            sx={{ my: 2 }}
                                            label="Paid"
                                            variant="outlined"
                                            color="success"
                                            icon={<CreditScoreOutlined />}
                                        />
                                    ) : (
                                        <Chip
                                            sx={{ my: 2 }}
                                            label="Order pending payment"
                                            variant="outlined"
                                            color="error"
                                            icon={<CreditCardOffOutlined />}
                                        />
                                    )}
                                </Box>
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
import { dbOrders } from '../../../database';

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const { id = '' } = query;

    const order = await dbOrders.getOrderById(id.toString());
    console.log(order);

    if (!order) {
        return {
            redirect: {
                destination: `/admin/orders`,
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
