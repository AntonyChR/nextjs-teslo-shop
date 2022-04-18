import { createContext } from 'react';
import { AddressUserFormData, ICartProduct } from '../../interfaces';

interface ContextProps {
  shippingAdderss?:AddressUserFormData;
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
  //methods
  addProductToCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeProductFromCart: (id: string, size:string) => void;
  updateAddresss: (address: AddressUserFormData) => void;
  createOrder: () => Promise<{hasError: boolean; message: string}>;
}

export const CartContext = createContext({} as ContextProps);