import { NextPage } from 'next';
import NextLink from 'next/link';
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ShopLayout } from '../../components/layouts';
import { IOrdersHistory } from '../../interfaces';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'N°', width: 50 },
    { field: 'orderId', headerName: 'Order ID', width: 200 },
    { field: 'fullName', headerName: 'Nombre Completo', width: 300 },
    {
        field: 'paid',
        headerName: 'Pagado',
        description: 'Muestra información si está pagada o no',
        width: 150,
        renderCell: (params) => {
            return params.row.paid ? (
                <Chip color="success" label="Pagado" variant="outlined" />
            ) : (
                <Chip color="error" label="No pagado" variant="outlined" />
            );
        },
    },
    {
        field: 'showOrder',
        headerName: 'Ver orden',
        width: 100,
        sortable: false,
        renderCell: (params) => {
            return (
                <NextLink href={`/orders/${params.row.orderId}`} passHref>
                    <Link underline="always">Ver Orden</Link>
                </NextLink>
            );
        },
    },
];

interface Props {
    orders: IOrdersHistory[];
}
const HistoryPage: NextPage<Props> = ({ orders }) => {
    const formatedRows = orders.map((order, index) => {
        return {
            fullName: ` ${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
            orderId: order._id,
            paid: order.isPaid,
            id: index + 1,
        };
    });
    return (
        <ShopLayout title="Historial de compras" pageDescription="Historial de compras">
            <Typography variant="h1" component="h1">
                Historial de compras
            </Typography>
            <Grid container className="fadeIn">
                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    <DataGrid rows={formatedRows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session: any = await getSession({ req });
    if (!session) {
        return {
            redirect: {
                destination: '/auth/login?p=/orders/history',
                permanent: false,
            },
        };
    }

    const orders = await dbOrders.getOrdersByUserId(session.user._id);
    return {
        props: {
            orders,
        },
    };
};

export default HistoryPage;
