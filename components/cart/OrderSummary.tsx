import { FC, useContext } from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import { CartContext } from '../../context/cart';
import { currency } from '../../utils';

interface Props {}

export const OrderSummary: FC<Props> = () => {
    const {numberOfItems,tax,subTotal,total} = useContext(CartContext);
    return (
        <Grid container spacing={1}>
            <Grid item xs={6}>
                <Typography>N° productos</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{numberOfItems} items</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Subtotal</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{currency.format(subTotal)}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Impuestos</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{currency.format(tax)}</Typography>
            </Grid>
            <Divider sx={{ my: 1 }} />

            <Grid item xs={6} sx={{mt:2}}>
                <Typography variant='subtitle1'>Total</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end' sx={{mt:2}}>
                <Typography variant='subtitle1'>{currency.format(total)}</Typography>
            </Grid>
        </Grid>
    );
};
