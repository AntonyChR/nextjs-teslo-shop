import { FC } from 'react';
import { Divider, Grid, Typography } from '@mui/material';

interface Props {}

export const OrderSummary: FC<Props> = () => {
    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography>N° productos</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>3 items</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Subtotal</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>$ 134.44</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Impuestos</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>$ 134.44</Typography>
            </Grid>
            <Divider sx={{ my: 1 }} />

            <Grid item xs={6} sx={{mt:2}}>
                <Typography variant='subtitle1'>Total</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end' sx={{mt:2}}>
                <Typography variant='subtitle1'>$1000</Typography>
            </Grid>
        </Grid>
    );
};
