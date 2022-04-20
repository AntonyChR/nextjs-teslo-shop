import { useContext, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { getSession, signIn } from 'next-auth/react';

import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ErrorOutline } from '@mui/icons-material';

import { AuthContext } from '../../context';
import { AuthLayout } from '../../components/layouts';
import { validations } from '../../utils';

type FormData = {
    email: string;
    password: string;
    name: string;
};
const RegisterPage = () => {

    const router = useRouter();
    const {registerUser} = useContext(AuthContext);

    const [showError, setShowError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('')

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onRegisterUser = async ({ email, password, name }: FormData) => {
        setShowError(false);
        const resp = await registerUser(name,email,password);
        if(resp.hasError){
            setShowError(true)
            setErrorMessage(resp.message!)
            setTimeout(()=>setShowError(false),3000)
            return;
        }
        /* const destination = router.query.p?.toString() || '/';
        router.replace(destination); */
        await signIn('credentials',{email,password});
        
    };
    return (
        <AuthLayout title="Crear cuenta">
            <form onSubmit={handleSubmit(onRegisterUser)}>
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Typography variant="h1" component="h1">
                                {' '}
                                Registrate
                            </Typography>
                            <Chip
                                label="Verifique que los campos esten correctos"
                                color="error"
                                icon={<ErrorOutline />}
                                className="fadeIn"
                                sx={{ display: showError ? 'flex' : 'none' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Nombre"
                                variant="filled"
                                fullWidth
                                {...register('name', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 3, message: 'El nombre debe tener al menos 3 carácteres' },
                                })}
                                error={!!errors.name}
                                helperText={errors.name?.message}
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
                                Crear cuenta
                            </Button>
                        </Grid>
                        <Grid item xs={12} display="flex" justifyContent="end">
                            <NextLink href={`/auth/login?p=${router.query.p || ''}`} passHref>
                                <Link color="secondary" underline="always">
                                    Ingresar
                                </Link>
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    );
};

import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async ({req, query}) => {

    const session = await getSession({req})
    const {p='/'} = query;
    if(session){
        return {
            redirect:{
                destination: p.toString(),
                permanent: false
            }
        }
    }
    return {
        props: {
        }
    }
}

export default RegisterPage;
