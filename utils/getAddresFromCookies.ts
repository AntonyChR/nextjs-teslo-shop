import Cookies from "js-cookie";
import { AddressUserFormData } from "../interfaces";

export const getAddressFromCookies = (): AddressUserFormData => {
    const firstName  = Cookies.get('firstName') || '';
    const lastName   = Cookies.get('lastName') || '';
    const address1   = Cookies.get('address1') || '';
    const address2   = Cookies.get('address2') || '';
    const postalCode = Cookies.get('postalCode') || '';
    const city       = Cookies.get('city') || '';
    const country    = Cookies.get('country') || '';
    const phone      = Cookies.get('phone') || '';
    return {
        firstName,
        lastName,
        address1,
        address2,
        postalCode,
        city,
        country,
        phone,
    }
}