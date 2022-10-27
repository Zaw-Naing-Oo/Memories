import React, { useEffect } from 'react'
import useStyle from './styles.js';
import { Card, CardContent, CardActions, Typography, Button, ButtonBase } from '@material-ui/core'
import { Delete, MoreHoriz, ThumbUpAlt, ThumbUpAltOutlined } from '@material-ui/icons'
import {CardMedia} from '@material-ui/core';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts.js'
import {useLocation } from 'react-router-dom';


const Post = ({ post, setCurrentId}) => {
  const dispatch = useDispatch();
  const classes = useStyle();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('profile'));


  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.decode?.sub || user?.result?._id))
        ? (
          <><ThumbUpAlt fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };
    
  return (
    <Card className={ classes.card } raised elevation={6}>
      <ButtonBase className={classes.cardAction}>
        <CardMedia 
          className={classes.media} 
          image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} 
          title={post.title} 
        />
        <div className={classes.overlay}>
          <Typography variant='h6'>{ post.name }</Typography>
          <Typography variant='body2'>
              { moment(post.createdAt).fromNow() }
          </Typography> 
        </div>
        <div className={classes.overlay2}>
          { (user?.result?._id === post?.creator || user?.decode?.sub === post?.creator) && (
            <Button style={{color: 'white'}} size="small" onClick={ (e) => { 
              e.stopPropagation();
              setCurrentId(post._id)} 
            }>
              <MoreHoriz fontSize='medium' />
            </Button>
          )}
        </div>
        <div className={ classes.details}>
          <Typography variant="body2" color='textSecondary'> { post.tags.map(tag => `#${tag}`)} </Typography>
        </div>
        <Typography variant="h5" className={ classes.title } gutterBottom> { post.title } </Typography>
        <CardContent>
          <Typography color='textSecondary' component='p'> { post.message } </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={ classes.cardActions }>
        <Button size='small' color='primary' disabled={!user?.result && !user?.decode} onClick={ () => {dispatch(likePost(post._id))} }>
           <Likes />
        </Button>
        { (user?.result?._id === post?.creator || user?.decode?.sub === post?.creator) && (
          <Button size='small' color='primary' onClick={ () => { dispatch(deletePost(post._id))} }>
           <Delete fontSize='small' />
            Delete
        </Button>
        )}
      </CardActions>
    </Card>
  )
}

export default Post