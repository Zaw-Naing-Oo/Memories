
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        // console.log(postMessages);
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    // console.log(req.body);
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString() });
    console.log(newPost);
    try {
        console.log('no')
        const post = await newPost.save();
        return res.status(201).json(post);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const updatePost = async (req, res) => {
    // console.log(req.params);
    const {id : _id} = req.params;
    const newPost = req.body;
    try {
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post is found with that id");
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...newPost, _id }, { new: true });
        res.json(updatedPost);
    } catch (error) {
        res.status(409).json({message: error});
    }

};

export const deletePost = async (req, res) => {
    const { id } = req.params;
    // console.log(typeof(id));
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post is found with that id");
        await PostMessage.findByIdAndRemove(id);
        console.log('Delete');
        res.json({ message: "Post successfully deleted"});
    } catch (error) {
        res.status(409).json({message: error});
    }
}

export const likePost = async (req, res) => {
    const { id } = req.params;
    try {
        if(!req.userId) return res.json({ message: 'Unauthenticated' });
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post is found with that id");
        const post = await PostMessage.findById(id);

        const index = post.likes.findIndex(id => id !== String(req.userId));

        if( index !== -1) {
            // like the post
            post.likes.push(req.userId);
        } else {
            // dislike the post
            post.likes = post.likes.filter(id => id !== String(req.userId));
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
        res.status(200).json(updatedPost);
    } catch (error) {
        console.log(error);
        res.status(409).json({ message: error });
    }
}
