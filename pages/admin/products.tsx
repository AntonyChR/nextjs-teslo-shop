import NextLink from 'next/link';
import { AddOutlined, ConfirmationNumberOutlined } from '@mui/icons-material';
import { Box, CardMedia, Button, Grid, Link } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import useSWR from 'swr';
import { AdminLayout } from '../../components/layouts';
import { IProduct } from '../../interfaces';

const columns: GridColDef[] = [
    {
        field: 'img',
        headerName: 'Image',
        renderCell: ({ row }: GridValueGetterParams) => {
            return (
                <a href={row.slug} target="_blank" rel="noreferrer">
                    <CardMedia alt={row.title} component="img" className="fadeIn" image={row.img} />
                </a>
            );
        },
    },
    {
        field: 'title',
        headerName: 'Title',
        width: 250,
        renderCell: ({ row }: GridValueGetterParams) => {
            return (
                <NextLink href={`/admin/products/${row.slug}`} passHref>
                    <Link underline="always">{row.title}</Link>
                </NextLink>
            );
        },
    },
    { field: 'gender', headerName: 'Gender' },
    { field: 'type', headerName: 'Type' },
    { field: 'inStock', headerName: 'In Stock' },
    { field: 'price', headerName: 'Price' },
    { field: 'sizes', headerName: 'Sizes', width: 200 },
];

const Products = () => {
    const { data, error } = useSWR<IProduct[]>('/api/admin/products');
    if (!data && !error) return <h1>Loading...</h1>;
    const rows = data!.map((product) => ({
        id: product._id,
        img: product.images[0],
        title: product.title,
        gender: product.gender,
        type: product.type,
        inStock: product.inStock,
        price: product.price,
        sizes: product.sizes,
        slug: product.slug,
    }));
    return (
        <AdminLayout title="Products" subTitle="Products managment" icon={<ConfirmationNumberOutlined />}>
            <Box display="flex" justifyContent="end" sx={{ mb: 2 }}>
                <Button startIcon={<AddOutlined />} color="secondary" href="/admin/products/new">
                    Create product
                </Button>
            </Box>
            <Grid container className="fadeIn">
                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
                </Grid>
            </Grid>
        </AdminLayout>
    );
};

export default Products;
