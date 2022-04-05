import { UiState } from "./"

type UiActionType =
    | { type: 'UI - toggle menu' }

export const uiReducer =  (state: UiState, action: UiActionType) : UiState => {
switch (action.type) {
    case 'UI - toggle menu':
        return {
            ...state,
            isMenuOpen: !state.isMenuOpen
        }
    default:
        return state
}
}