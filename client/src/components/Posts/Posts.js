import React from 'react'
import Post from './Post/Post'
import useStyle from './styles.js';


const Posts = () => {
  const classes = useStyle();

  return (
    <div>
        <Post />
        <Post />
        <Post />
    </div>
  )
}

export default Posts