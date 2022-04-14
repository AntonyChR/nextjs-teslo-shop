import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { getSession, signIn, getProviders } from 'next-auth/react';

import { Box, Button, Chip, Divider, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

// import {AuthContext} from '../../context';
import { AuthLayout } from '../../components/layouts/AuthLayout';
import { validations } from '../../utils';

type FormData = {
    email: string;
    password: string;
};

const LoginPage = () => {
    const [showError, setShowError] = useState<boolean>(false);
    const router = useRouter();
    // const {loginUser} = useContext(AuthContext);

    const [providers, setProviders] = useState<any>({});

    useEffect(() => {
        getProviders().then((prov) => {
            setProviders(prov);
        });
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onLoginUser = async ({ email, password }: FormData) => {
        setShowError(false);
        await signIn('credentials', { email, password });
        /*         const isValidLogin = await loginUser(email, password);
        if (!isValidLogin) {
            setShowError(true);
            setTimeout(()=>setShowError(false),3000);
            return;
        }
        const destination = router.query.p?.toString() || '/';
        router.replace(destination); */
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
                                sx={{ display: showError ? 'flex' : 'none' }}
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
                            <NextLink href={`/auth/register?p=${router.query.p || ''}`} passHref>
                                <Link color="secondary" underline="always">
                                    Crear una cuenta
                                </Link>
                            </NextLink>
                        </Grid>
                        <Grid item xs={12} display="flex" flexDirection="column" justifyContent="end">
                            <Divider sx={{ width: '100%', mb: 2 }} />
                            {Object.values(providers).map((provider: any) => {
                                if (provider.id === 'credentials') return <div key="credentials"></div>;
                                return (
                                    <Button
                                        key={providers.id}
                                        variant="outlined"
                                        fullWidth
                                        color="primary"
                                        sx={{ mb: 1 }}
                                        onClick={()=>signIn(provider.id)}
                                    >
                                        {provider.name}
                                    </Button>
                                );
                            })}
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const session = await getSession({ req });
    const { p = '' } = query;
    if (session) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false,
            },
        };
    }
    return {
        props: {},
    };
};

export default LoginPage;
