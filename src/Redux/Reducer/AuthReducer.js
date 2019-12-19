const INITIAL_STATE = {
    username: '',
    email: '',
    role: '',
    cart: [],
    id: 0
}

export const authReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'LOGIN':
            return action.payload
        case 'LOGOUT':
            return INITIAL_STATE
        case 'ADD_TO_CART':
            return{
                ...state,
                cart: action.payload
            }
        case 'RENDER_CART':
        return{
            ...state,
            cart: action.payload
        }
        default:
            return INITIAL_STATE
    }
}