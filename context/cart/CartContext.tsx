import { createContext } from 'react';
import { ICartProduct } from '../../interfaces';

interface ContextProps {
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
  //methods
  addProductToCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeProductFromCart: (id: string, size:string) => void;
}

export const CartContext = createContext({} as ContextProps);