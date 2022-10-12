import React from 'react'
import useStyle from './styles.js';
import { Card, CardContent, CardActions, Typography, Button, CardMedia } from '@material-ui/core'
import { Delete, MoreHoriz, ThumbUpAlt } from '@material-ui/icons'
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts.js'


const Post = ({post, currentId, setCurrentId}) => {
  // console.log(typeof(post._id));
  const dispatch = useDispatch();
  const classes = useStyle();
  console.log(post);
  return (
    <Card className={ classes.card }>
      <CardMedia component="img" image={post.selectedFile} className={classes.media} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant='h6'>{ post.creator }</Typography>
        <Typography variant='body2'>
           { moment(post.createdAt).fromNow() }
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button style={{color: 'white'}} size="small" onClick={ () => { setCurrentId(post._id)} }>
          <MoreHoriz fontSize='medium' />
        </Button>
      </div>
      <div className={ classes.details}>
        <Typography variant="body2" color='textSecondary'> { post.tags.map(tag => `#${tag}`)} </Typography>
      </div>
      <Typography variant="h5" className={ classes.title } gutterBottom> { post.title } </Typography>
      <CardContent>
        <Typography color='textSecondary' component='p'> { post.message } </Typography>
      </CardContent>
      <CardActions className={ classes.cardActions }>
        <Button size='small' color='primary' onClick={ () => {dispatch(likePost(post._id))} }>
           <ThumbUpAlt fontSize='small' />
           Like &nbsp;
           { post.likeCount }
        </Button>
        <Button size='small' color='primary' onClick={ () => { dispatch(deletePost(post._id))} }>
           <Delete fontSize='small' />
           Delete
        </Button>
      </CardActions>
    </Card>
  )
}

export default Post