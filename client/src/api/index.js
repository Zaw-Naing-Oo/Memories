import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000'});

export const fetchPosts = async () =>  await API.get('/posts');
export const createPost = async(newPost) => await API.post('/posts', newPost);
export const updatePost = async (id, updatedPost) => await API.patch(`/posts/${id}` , updatedPost);
export const deletePost = async (id) => await API.delete(`/posts/${id}`);
export const likePost = async (id) => await API.patch(`/posts/${id}/likePost`);

export const signIn = async (formData) => await API.post('/users/signIn', formData);
export const signUp = async (formData) => await API.post('/users/signUp', formData);
