import { IUser } from "../../interfaces"
import { AuthActionType } from "./authActionTypes"

const login = (payload:any):AuthActionType => {
    return {type:"auth - login",payload}
}

export default{
    login,
}