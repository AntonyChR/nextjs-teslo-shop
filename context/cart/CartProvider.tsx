import { FC, useEffect, useReducer } from 'react';
import { cartReducer, CartContext, CartActions } from './';
import { AddressUserFormData, ICartProduct, IOrder } from '../../interfaces';
import Cookie from 'js-cookie';
import { getAddressFromCookies } from '../../utils';
import Cookies from 'js-cookie';
import { tesloApi } from '../../api';

export interface CartState {
    isLoaded:boolean,
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
    shippingAdderss?:AddressUserFormData;
}

const CART_INITIAL_STATE: CartState = {
    isLoaded:false,
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
    shippingAdderss: undefined
};

export const CartProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

    // Load cart from cookies
    useEffect(() => {
        try {
            const products = JSON.parse(Cookie.get('cart') || '[]');
            dispatch(CartActions.loadProductsFromCookies(products));
        } catch (error) {
            dispatch(CartActions.loadProductsFromCookies([]));
            console.warn('Error loading cart from cookies');
        }
    }, []);

    useEffect(()=>{
        const address = getAddressFromCookies();
        dispatch(CartActions.loadAddress(address));
    },[])

    // Save cart to cookies
    useEffect(() => {
        Cookie.set('cart', JSON.stringify(state.cart));
    }, [state.cart]);

    useEffect(() => {
        const numberOfItems = state.cart.reduce((acc, product) => acc + product.quantity, 0);
        const subTotal = state.cart.reduce((acc, product) => acc + product.quantity * product.price, 0);
        const TAX_RATE = 0.15;
        const orderSummary = {
            numberOfItems,
            subTotal,
            tax: parseFloat((subTotal * TAX_RATE).toFixed(2)),
            total: parseFloat((subTotal * (1 + TAX_RATE)).toFixed(2)),
        };
        dispatch(CartActions.updateOrderSummary(orderSummary));
    }, [state.cart]);

    // ------------------------ change cart state-----------------------------
    const addProductToCart = (product: ICartProduct) => {
        const isProductInCart = state.cart.some((p) => p._id === product._id);
        if (isProductInCart === false) {
            return dispatch(CartActions.updateProducts([...state.cart, product]));
        }

        const productInCartButDifferentSize = state.cart.some((p) => p._id === product._id && p.size === product.size);
        if (productInCartButDifferentSize === false) {
            return dispatch(CartActions.updateProducts([...state.cart, product]));
        }

        const updatedProducts = state.cart.map((p) => {
            if (p._id !== product._id) return p;
            if (p.size !== product.size) return p;

            p.quantity += product.quantity;
            return p;
        });
        dispatch(CartActions.updateProducts(updatedProducts));
    };

    const updateCartQuantity = (product: ICartProduct) => {
        dispatch(CartActions.updateQuantityProduct(product));
    };

    const removeProductFromCart = (id: string, size: string) => {
        const updatedProducts = state.cart.filter((p) => !(p._id === id && p.size === size));
        dispatch(CartActions.removeProduct(updatedProducts));
    };

    const updateAddresss = (address: AddressUserFormData) => {
        Cookies.set('firstName',address.firstName);
        Cookies.set('lastName',address.lastName);
        Cookies.set('address1',address.address1);
        Cookies.set('address2',address.address2 || '');
        Cookies.set('postalCode',address.postalCode);
        Cookies.set('city',address.city);
        Cookies.set('country',address.country);
        Cookies.set('phone',address.phone);
        dispatch(CartActions.loadAddress(address));
    }
    // -----------------------------------------------------------------------

    const createOrder = async () => {

        if(!state.shippingAdderss) throw new Error('No shipping address');

        const body:IOrder = {
            orderItems: state.cart.map(p=>({...p, size: p.size!})),
            shippingAddress: state.shippingAdderss,
            numberOfItems: state.numberOfItems,
            subTotal: state.subTotal,
            tax: state.tax,
            total: state.total,
            isPaid: false            
        }
        
        try {
            const {data} = await tesloApi.post('/orders',body)
            console.log(data)
        } catch(error) {
            console.log(error)
        }
    }
    return (
        <CartContext.Provider
            value={{
                ...state,
                //methods
                addProductToCart,
                updateCartQuantity,
                removeProductFromCart,
                updateAddresss,
                createOrder
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
