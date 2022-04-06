import { ICartProduct } from "../../interfaces"
import { CartState } from "./CartProvider"

type CartActionType = 
    | {type:'cart - Load from cookies | storage'}
    | {type:'cart - Add item', payload: ICartProduct}


export const cartReducer = (state: CartState, action: CartActionType):CartState =>{

    switch(action.type){
        case 'cart - Load from cookies | storage':
            return {
                ...state,
            }
        default:
            return state
    }

}