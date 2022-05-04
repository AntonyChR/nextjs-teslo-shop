import useSWR from 'swr';
import { useEffect, useState } from 'react';
import {
    CreditCardOffOutlined,
    ProductionQuantityLimitsOutlined,
    GroupOutlined,
    CategoryOutlined,
    AttachMoneyOutlined,
    DashboardOutlined,
    CancelPresentationOutlined,
    AccessTimeOutlined,
} from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';

import { AdminLayout } from '../../components/layouts';
import { SummaryTile } from '../../components/admin';
import { DashBoardSummaryResponse } from '../../interfaces';

const Dashboard = () => {
    const timeRequest = 30;
    const { data, error } = useSWR<DashBoardSummaryResponse>('/api/admin/dashboard', {
        refreshInterval: timeRequest * 1000,
    });

    const [refreshIn, setRefreshIn] = useState(30)
    useEffect(()=>{
        const interval = setInterval(()=>{
            setRefreshIn(refreshIn=> refreshIn>0? refreshIn -1:timeRequest)
        }, 1000)
        return ()=>{
            clearInterval(interval);
        }
    },[])


    if (!error && !data) {
        return <h1>loading...</h1>;
    }
    if (error) {
        console.log(data)
        console.log(error);
        return <Typography>error loading information</Typography>;
    }

    const {
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWidthNoInventory,
        lowInventory,
        notPaidOrders,
    } = data!;

    return (
        <AdminLayout title="Dashboard" subTitle="general statistics" icon={<DashboardOutlined />}>
            <Grid container spacing={2}>
                <SummaryTile
                    title={numberOfOrders}
                    subTitle="Total orders"
                    icon={<CreditCardOffOutlined color="secondary" sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={paidOrders}
                    subTitle="Paid orders"
                    icon={<AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={notPaidOrders}
                    subTitle="Pending orders"
                    icon={<CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={numberOfClients}
                    subTitle="Clients"
                    icon={<GroupOutlined color="primary" sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={numberOfProducts}
                    subTitle="Products"
                    icon={<CategoryOutlined color="error" sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={productsWidthNoInventory}
                    subTitle="Sold out products"
                    icon={<CancelPresentationOutlined color="warning" sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={lowInventory}
                    subTitle="Products in stock"
                    icon={<ProductionQuantityLimitsOutlined color="warning" sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={`${refreshIn}s`}
                    subTitle="Update"
                    icon={<AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} />}
                />
            </Grid>
        </AdminLayout>
    );
};

export default Dashboard;
