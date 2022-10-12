import React from 'react'
import Post from './Post/Post'
import useStyle from './styles.js';
import { CircularProgress, Grid} from '@material-ui/core'
import { useSelector } from 'react-redux'

const Posts = ({currentId, setCurrentId}) => {
  const classes = useStyle();
  const posts = useSelector( (state) => state.posts);
  console.log(posts);

  return (
    !posts.length ? <CircularProgress /> : (
      <Grid className={ classes.mainContainer} container alignItems="stretch" spacing={2}>
         { posts.map(post => (
          <Grid key={post._id} item xs={12} sm={6}>
             <Post  post={post} currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
         ))}
      </Grid>
    )
  )
}

export default Posts