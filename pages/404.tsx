import { Box, Typography } from '@mui/material';
import { ShopLayout } from '../components/layouts';

const PageNotFound = () => {
    return (
        <ShopLayout title="Page not found" pageDescription="No hay nada que mostrar">
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                height="calc(100vh - 200px)"
            >
                <img height="200px" src="/error-404.png" alt="404" />
                <Typography variant="h1">Esta página no existe</Typography>
            </Box>
        </ShopLayout>
    );
};

export default PageNotFound;
