// take everything from api/index
import * as api from '../api/index.js';

// Action creators are functions that return actions

//  used redux-thunk
export const getPost = () => async(dispatch) => {
    try {
        const { data } = api.fetchPosts();
        dispatch({ type: 'FETCH_ALL', payload: data});
    } catch (error) {
        console.log(error.message);
    }
}