import NextLink from 'next/link';
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ShopLayout } from '../../components/layouts';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 20 },
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
                <NextLink href={`/orders/${params.row.id}`} passHref>
                    <Link underline="always">Ver Orden</Link>
                </NextLink>
            );
        },
    },
];

const rows = [
    { id: 1, paid: false, fullName: 'Juan Perez' },
    { id: 2, paid: true, fullName: 'Juan Perez' },
    { id: 3, paid: false, fullName: 'Juan Perez' },
    { id: 4, paid: true, fullName: 'Juan Perez' },
    { id: 5, paid: false, fullName: 'Juan Perez' },
];

const HistoryPage = () => {
    return (
        <ShopLayout title="Historial de compras" pageDescription="Historial de compras">
            <Typography variant="h1" component="h1">
                Historial de compras
            </Typography>
            <Grid container>
                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
                </Grid>
            </Grid>
        </ShopLayout>
    );
};

export default HistoryPage;
