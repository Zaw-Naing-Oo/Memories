import { AUTH, LOGOUT } from '../actionNames/actions'


const auth = (state =  { authData : null } , action) => {
    switch (action.type) {
        case AUTH:
            console.log(action?.data);
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            // return action.payload;
            return {...state, authData: action?.data };
        default:
            return state;
    }
}

export default auth;