
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        console.log(postMessages);
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);
    try {
        await newPost.save();
        res.status(200).json(newPost);
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
    const {id} = req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post is found with that id");
        const post = await PostMessage.findById(id);
        const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1}, { new: true });
        res.json(updatedPost);
    } catch (error) {
        res.status(409).json({message: error});
    }
}
