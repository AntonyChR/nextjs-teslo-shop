import { Box, Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';

const EmptyPage = () => {
    return (
        <ShopLayout title="Cart Empty" pageDescription="Ningún artículo añadido">
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                height="calc(100vh - 200px)"
            >
                <img height="200px" src="/box.png" alt="404" />
                <Typography variant="h1">No has añadido ningún artículo</Typography>
            </Box>
        </ShopLayout>
    );
};

export default EmptyPage;
