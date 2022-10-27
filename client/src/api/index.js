import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000'});

// Interceptor is an API gateway server built for accepting API requests from the client applications and routing them to the appropriate backend services. 
API.interceptors.request.use( (req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const fetchPosts = async () =>  await API.get('/posts');
export const createPost = async (newPost) => await API.post('/posts/create', newPost);
export const updatePost = async (id, updatedPost) => await API.patch(`/posts/${id}` , updatedPost);
export const deletePost = async (id) => await API.delete(`/posts/${id}`);
export const likePost = async (id) => await API.patch(`/posts/${id}/likePost`);

export const signIn = async (formData) => await API.post('/users/signIn', formData);
export const signUp = async (formData) => await API.post('/users/signUp', formData);
