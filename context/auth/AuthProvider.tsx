import { FC, useEffect, useReducer } from 'react';
import Cookies from 'js-cookie';

import { IUser } from '../../interfaces';
import { authReducer, AuthContext, authActions } from './';
import { tesloApi } from '../../api';
import axios from 'axios';

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
};

export const AuthProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);



    const checkToken = async() => {
        try{
            const {data} = await tesloApi.get('/user/validate-token');
            const {token, user} = data;
            Cookies.set('token', token);
            dispatch(authActions.login(user));
        }catch(error){
            console.log(error)
            Cookies.remove('token');
        }
    }
    const loginUser = async (email: string, password: string): Promise<boolean> => {
        try {
            const { data } = await tesloApi.post('/user/login', { email, password });
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch(authActions.login(user));
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    const registerUser = async (
        name: string,
        email: string,
        password: string
    ): Promise<{ hasError: boolean; message?: string }> => {
        try {
            const { data } = await tesloApi.post('/user/register', { email, password, name });
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch(authActions.login(user));
            return {
                hasError: false,
            };
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error)) {
                return {
                    hasError: true,
                    message: error.response?.data.message,
                };
            }
            return {
                hasError: true,
                message: 'Error al crear el usuario, intentelo nuevamente',
            };
        }
    };

    useEffect(()=>{
        checkToken();
    },[])

    return (
        <AuthContext.Provider
            value={{
                ...state,

                //methods
                loginUser,
                registerUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
