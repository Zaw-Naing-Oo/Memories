
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
import User from "../models/users.js";

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString() });
    try {
        await newPost.save();
        return res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const updatePost = async (req, res) => {
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

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post is found with that id");
        await PostMessage.findByIdAndRemove(id);
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

        if( index === -1) {
            // like the post
            post.likes.push(req.userId);
        } else {
            // dislike the post
            post.likes = post.likes.filter(id => id !== String(req.userId));
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
        return res.status(200).json(updatedPost);
    } catch (error) {
        console.log(error);
        res.status(409).json({ message: error });
    }
}
