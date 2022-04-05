import { FC, useReducer } from 'react';
import { uiReducer, UiContext } from './';

export interface UiState {
    isMenuOpen: boolean;
}

const Ui_INITIAL_STATE: UiState = {
    isMenuOpen: false,
};

export const UiProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(uiReducer, Ui_INITIAL_STATE);
    const toggleSideMenu = () => dispatch({ type: 'UI - toggle menu' });
    return (
        <UiContext.Provider 
            value={{ 
                ...state, 
                //methods
                toggleSideMenu
            }}
        >
            {children}
        </UiContext.Provider>
    )
};
