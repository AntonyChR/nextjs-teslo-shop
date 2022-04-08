import { FC, useEffect, useReducer } from 'react';
import { cartReducer, CartContext, action } from './';
import { ICartProduct } from '../../interfaces';
import Cookie from 'js-cookie';

export interface CartState {
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
}

const CART_INITIAL_STATE: CartState = {
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
};

export const CartProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

    // Load cart from cookies
    useEffect(() => {
        try {
            const productsfromCookies = JSON.parse(Cookie.get('cart') || '[]');
            dispatch(action.loadFromCookies(productsfromCookies));
        } catch (error) {
            dispatch(action.loadFromCookies([]));
            console.warn('Error loading cart from cookies');
        }
    }, []);

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
        dispatch(action.updateOrderSummary(orderSummary));
    }, [state.cart]);

    // ------------------------ change cart state-----------------------------
    const addProductToCart = (product: ICartProduct) => {
        const isProductInCart = state.cart.some((p) => p._id === product._id);
        if (isProductInCart === false) {
            return dispatch(action.updateProducts([...state.cart, product]));
        }

        const productInCartButDifferentSize = state.cart.some((p) => p._id === product._id && p.size === product.size);
        if (productInCartButDifferentSize === false) {
            return dispatch(action.updateProducts([...state.cart, product]));
        }

        const updatedProducts = state.cart.map((p) => {
            if (p._id !== product._id) return p;
            if (p.size !== product.size) return p;

            p.quantity += product.quantity;
            return p;
        });
        dispatch(action.updateProducts(updatedProducts));
    };

    const updateCartQuantity = (product: ICartProduct) => {
        dispatch(action.updateQuantityProduct(product));
    };

    const removeProductFromCart = (id: string, size: string) => {
        const updatedProducts = state.cart.filter((p) => !(p._id === id && p.size === size));
        dispatch(action.removeProduct(updatedProducts));
    };
    // -----------------------------------------------------------------------
    return (
        <CartContext.Provider
            value={{
                ...state,
                //methods
                addProductToCart,
                updateCartQuantity,
                removeProductFromCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
