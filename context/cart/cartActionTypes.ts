import { ICartProduct } from "../../interfaces";

export type CartActionType =
    | { type: 'cart - load from cookies', payload: ICartProduct[] }
    | { type: 'cart - update products', payload: ICartProduct[] }
    | { type: 'cart - change product quantity', payload: ICartProduct }
    | { type: 'cart - remove product', payload: ICartProduct[] }
    | {
        type: 'cart - update order summary', payload: {
            numberOfItems: number;
            subTotal: number;
            tax: number;
            total: number;
        }
    }
