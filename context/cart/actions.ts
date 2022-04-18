import { CartActionType } from "./";
import { AddressUserFormData, ICartProduct } from "../../interfaces";

export const updateProducts = (products:ICartProduct[]):CartActionType =>{
    return {type:'cart - update products', payload:products};
};

export const loadProductsFromCookies = (products:ICartProduct[]):CartActionType =>{
    return {type:'cart - load from cookies', payload:products};
}

export const updateQuantityProduct = (product:ICartProduct):CartActionType => {
    return {type:'cart - change product quantity', payload:product};
}

export const removeProduct = (products:ICartProduct[]):CartActionType => {
    return {type:'cart - remove product', payload:products};
}

export const updateOrderSummary =  (orderSummary:any):CartActionType => {
    return {type:'cart - update order summary', payload:orderSummary};
}

export const loadAddress = (address:AddressUserFormData):CartActionType => {
    return {type:"cart - load addres from cookies",payload:address}
}
export const orderComplete = ():CartActionType=>{
    return {type :"cart - order complete"}
}

//export functions
