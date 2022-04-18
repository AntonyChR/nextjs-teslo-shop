import { FC, useContext } from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import { CartContext } from '../../context/cart';
import { currency } from '../../utils';

interface Props {
    orderValues: {
        numberOfItems: number;
        tax: number;
        subTotal: number;
        total: number;
    };
}

export const OrderSummary: FC<Props> = ({ orderValues }) => {
    const { numberOfItems, tax, subTotal, total } = useContext(CartContext);
    const summaryValues = orderValues ? orderValues : { numberOfItems, tax, subTotal, total };

    return (
        <Grid container spacing={1}>
            <Grid item xs={6}>
                <Typography>N° productos</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="end">
                <Typography>
                    {summaryValues.numberOfItems} item{summaryValues.numberOfItems > 1 && 's'}
                </Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Subtotal</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="end">
                <Typography>{currency.format(summaryValues.subTotal)}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Impuestos</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="end">
                <Typography>{currency.format(summaryValues.tax)}</Typography>
            </Grid>
            <Divider sx={{ my: 1 }} />

            <Grid item xs={6} sx={{ mt: 2 }}>
                <Typography variant="subtitle1">Total</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="end" sx={{ mt: 2 }}>
                <Typography variant="subtitle1">{currency.format(summaryValues.total)}</Typography>
            </Grid>
        </Grid>
    );
};
