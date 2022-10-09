import React from 'react'
import Post from './Post/Post'
import useStyle from './styles.js';
import { useSelector } from 'react-redux'

const Posts = () => {
  const classes = useStyle();
  const posts = useSelector( (state) => state.posts);
  console.log(posts);

  return (
    <div>
        <Post />
        <Post />
        <Post />
    </div>
  )
}

export default Posts