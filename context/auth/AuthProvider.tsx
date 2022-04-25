import { FC, useEffect, useReducer } from 'react';
import Cookies from 'js-cookie';
import {signOut, useSession} from 'next-auth/react';

import { IUser } from '../../interfaces';
import { authReducer, AuthContext, authActions } from './';
import { tesloApi } from '../../api';
import axios from 'axios';
//import { useRouter } from 'next/router';

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
    const {data,status} = useSession();

    
    useEffect(()=>{
        console.log(status)
        if(status==='authenticated'){
            dispatch(authActions.login(data.user));
        }
    },[data,status])
    /* 
    const checkToken = async() => {
        if(!Cookies.get('token')) return;
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
    useEffect(()=>{
        checkToken();
    },[])
  */
    const loginUser = async (email: string, password: string): Promise<boolean> => {
        try {
            const { data } = await tesloApi.post('/user/login', { email, password });
            const { token, user } = data;
            console.log(data)

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

    const logout = () => {
        Cookies.remove('firstName');
        Cookies.remove('lastName');
        Cookies.remove('address1');
        Cookies.remove('address2');
        Cookies.remove('postalCode');
        Cookies.remove('city');
        Cookies.remove('country');
        Cookies.remove('phone');
        Cookies.remove('cart');
        signOut({callbackUrl:'/'});
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,

                //methods
                loginUser,
                registerUser,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
