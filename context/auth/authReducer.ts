import { AuthActionType } from "./authActionTypes";
import { AuthState } from "./AuthProvider";


export const authReducer = (state:AuthState,action:AuthActionType):AuthState =>{
    switch(action.type){
        case 'auth - login':
            return {
                ...state,
                isLoggedIn:true,
                user:action.payload
            }
        case 'auth - logout':
            return {
                ...state,
                isLoggedIn:false,
                user:undefined
            }
        default:
            return state
    }
    
}