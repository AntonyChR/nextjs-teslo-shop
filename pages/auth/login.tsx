import { useContext, useState } from 'react';

import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

import {AuthContext} from '../../context';
import { AuthLayout } from '../../components/layouts/AuthLayout';
import { validations } from '../../utils';

type FormData = {
    email: string;
    password: string;
};

const LoginPage = () => {
    const router = useRouter();
    const {loginUser} = useContext(AuthContext);
    const [showError, setShowError] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onLoginUser = async ({ email, password }: FormData) => {
        setShowError(false);
        const isValidLogin = await loginUser(email, password);
        if (!isValidLogin) {
            setShowError(true);
            setTimeout(()=>setShowError(false),3000);
            return;
        }
        router.replace('/');
    };
    return (
        <AuthLayout title="Ingresar">
            <form onSubmit={handleSubmit(onLoginUser)}>
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Typography variant="h1" component="h1">
                                {' '}
                                Iniciar sesión
                            </Typography>
                            <Chip
                                label="No se reconoce el usuario o la contraseña"
                                color="error"
                                icon={<ErrorOutline />}
                                className="fadeIn"
                                sx={{display: showError ? 'flex' : 'none'}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Correo electrónico"
                                variant="filled"
                                fullWidth
                                {...register('email', {
                                    required: 'Este campo es requerido',
                                    validate: validations.isEmail,
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Contranseña"
                                type="password"
                                variant="filled"
                                fullWidth
                                {...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 6, message: 'La contraseña debe tener al menos 6 caracteres' },
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" color="secondary" className="circular-btn" size="large" fullWidth>
                                Ingresar
                            </Button>
                        </Grid>
                        <Grid item xs={12} display="flex" justifyContent="end">
                            <NextLink href="/auth/register" passHref>
                                <Link color="secondary" underline="always">
                                    Crear una cuenta
                                </Link>
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    );
};

export default LoginPage;
