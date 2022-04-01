import NextLink from 'next/link';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../../components/layouts/AuthLayout';

const RegisterPage = () => {
    return (
        <AuthLayout title="Crear cuenta">
            <Box sx={{ width: 350, padding: '10px 20px' }}>
                <Grid container spacing={2}>
                    <Grid item>
                        <Typography variant="h1" component="h1">
                            {' '}
                            Crear cuenta
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Nombre" variant="filled" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Correo electrónico" variant="filled" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Contranseña" type="password" variant="filled" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <Button color="secondary" className="circular-btn" size="large" fullWidth>
                            Crear
                        </Button>
                    </Grid>
                    <Grid item xs={12} display="flex" justifyContent="end">
                        <NextLink href="/auth/login" passHref>
                            <Link color="secondary" underline="always">
                                Ingresar
                            </Link>
                        </NextLink>
                    </Grid>
                </Grid>
            </Box>
        </AuthLayout>
    );
};

export default RegisterPage;
