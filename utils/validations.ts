import { validations } from ".";


export const isValidEmail = (email: string): boolean => {

    const match = String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

    return !!match;
};

export const isEmail = (email: string): string | undefined => {
    return isValidEmail(email)
        ? undefined
        : 'El correo no parece ser válido';
}


interface NewUserData {
    email: string;
    password: string;
    name: string;
}
export const newUserDataValidation = ({ email, name, password }: NewUserData): { isValidData: boolean, validationMessage: string } => {

    if (password.length < 6) {
        return { isValidData: false, validationMessage: 'password must be at least 6 characters' };
    }

    if (name.length < 3) {
        return { isValidData: false, validationMessage: 'name must be at least 3 characters' };
    }

    if (validations.isValidEmail(email) === false) {
        return { isValidData: false, validationMessage: 'email is not valid' };
    }

    return {
        isValidData: true,
        validationMessage: ''
    }
}

