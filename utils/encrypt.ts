import bcrypt from 'bcryptjs';
export const  encrypt = (text:string) => bcrypt.hashSync(text);

export const encryptObjectField = (object:any, field:string) => {
    return {...object, [field]: encrypt(object[field])}
}