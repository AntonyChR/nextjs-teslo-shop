import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { Chip, Grid } from '@mui/material';
import { DataGrid, GridColDef,GridValueGetterParams } from '@mui/x-data-grid';
import useSWR from 'swr';
import { AdminLayout } from '../../components/layouts';
import { IOrder, IUser } from '../../interfaces';

const columns:GridColDef[] =[
    {field:'id', headerName:' Order ID', width:250},
    {field:'email', headerName:'Email', width:250},
    {field:'name', headerName:'Name', width:200},
    {field:'total', headerName:'Mount', width:100},
    {
        field: 'isPaid',
        headerName: 'Status',
        renderCell: ({row}: GridValueGetterParams)=>{
            return row.isPaid 
            ?<Chip variant='outlined' label='Paid' color='success' />
            :<Chip variant='outlined' label='Not paid' color='error' />
        }
    },
    {field:'numProducts', headerName:'N° Products', align:'center'},
    {
        field:'check',
        headerName: 'Show Order',
        renderCell: ({row}: GridValueGetterParams)=>{
            return <a href={`/admin/orders/${row.id}`} target='_blank' rel="noreferrer">Show Order</a>
        }
    },
    {field:'createdAt', headerName:'Creation Date',width:200},
]

const Orders = () => {
    const {data, error} = useSWR<IOrder[]>('/api/admin/orders');
    if(!data && !error) return <h1>Loading...</h1>
    console.log(data)
    const rows = data!.map(order => ({
        id         : order._id,
        email      : (order.user as IUser).email,
        name       : (order.user as IUser).name,
        total      : order.total,
        isPaid     : order.isPaid,
        numProducts: order.orderItems.length,
        createdAt  : order.createdAt,
    }))
    return (
        <AdminLayout title="Orders" subTitle="Orders managment" icon={<ConfirmationNumberOutlined />}>
            <Grid container className="fadeIn">
                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
                </Grid>
            </Grid>
        </AdminLayout>
    );
};

export default Orders;
