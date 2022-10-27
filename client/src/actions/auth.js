import * as api from '../api/index.js';
import { AUTH } from '../actionNames/actions'

export const singIn = (formData,navigate) => async (dispatch) => {
    
    try {

        const { data } = await api.signIn(formData);
        dispatch({ type: AUTH, data });
        navigate('/');
        

    } catch (error) {
       console.log(error) 
    }
}


export const signUp = (formData,navigate) => async (dispatch) => {
    try {

        // send data to backend 
        const { data } = await api.signUp(formData);

        // send data to frontend reducer
        dispatch({ type: AUTH, data });
        navigate('/');
        

    } catch (error) {
       console.log(error) 
    }
}
