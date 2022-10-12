// take everything from api/index
import * as api from '../api/index.js';
import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../actionNames/actions'

// Action creators are functions that return actions

//  used redux-thunk
export const getPost = () => async(dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post) => async(dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, post) => async(dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        dispatch({ type: UPDATE, payload: data});
    } catch (error) {
        console.log(error);
    }
} 

export const deletePost = (id) => async(dispatch) => {
    // console.log(id);
    try {
        await api.deletePost(id);
        console.log('I dont reached here');
        dispatch({ type: DELETE, payload: id});
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async(dispatch) => {
    try {
        const { data }  = await api.likePost(id);
        dispatch({ type: UPDATE, payload: data});
    } catch (error) {
        console.log(error);
    }
}