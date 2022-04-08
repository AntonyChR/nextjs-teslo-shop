import { CartActionType } from "./";
import { ICartProduct } from "../../interfaces";

const updateProducts = (products:ICartProduct[]):CartActionType =>{
    return {type:'cart - update products', payload:products};
};

const loadFromCookies = (products:ICartProduct[]):CartActionType =>{
    return {type:'cart - load from cookies', payload:products};
}

const updateQuantityProduct = (product:ICartProduct):CartActionType => {
    return {type:'cart - change product quantity', payload:product};
}

const removeProduct = (products:ICartProduct[]):CartActionType => {
    return {type:'cart - remove product', payload:products};
}

const updateOrderSummary =  (orderSummary:any):CartActionType => {
    return {type:'cart - update order summary', payload:orderSummary};
}

//export functions
export default {
    updateProducts,
    loadFromCookies,
    updateQuantityProduct,
    removeProduct,
    updateOrderSummary
}