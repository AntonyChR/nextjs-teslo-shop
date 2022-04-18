import { CartActionType } from "./cartActionTypes"
import { CartState } from "./CartProvider"



export const cartReducer = (state: CartState, action: CartActionType): CartState => {

    switch (action.type) {
        case 'cart - load from cookies':
            return {
                ...state,
                isLoaded: true,
                cart: action.payload
            }
        case 'cart - update products':
            return {
                ...state,
                cart: action.payload
            }
        case 'cart - change product quantity':
            return {
                ...state,
                cart: state.cart.map(product => {
                    if (product._id !== action.payload._id) return product;
                    if (product.size !== action.payload.size) return product;
                    return action.payload;
                })
            }
        case 'cart - remove product':
            return {
                ...state,
                cart: action.payload
            }
        case 'cart - update order summary':
            return {
                ...state,
                ...action.payload
            }
        case 'cart - update address':
        case 'cart - load addres from cookies':
            return {
                ...state,
                shippingAdderss: action.payload
            }
        case 'cart - order complete':
            return {
                ...state,
                cart: [],
                numberOfItems: 0,
                subTotal: 0,
                tax: 0,
                total: 0
            }
        default:
            return state
    }

}