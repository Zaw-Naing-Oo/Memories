import React from 'react'
import useStyle from './styles.js';
import { Card, CardContent, CardActions, Typography, Button, CardMedia } from '@material-ui/core'
import { Delete, MoreHoriz, ThumbUpAlt } from '@material-ui/icons'
import moment from 'moment';


const Post = ({post, currentId, setCurrentId}) => {
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
          <MoreHoriz fontSize='default' />
        </Button>
      </div>
      <div className={ classes.details}>
        <Typography variant="body2" color='textSecondary'> { post.tags.map(tag => `#${tag}`)} </Typography>
      </div>
      <Typography variant="h5" className={ classes.title } gutterBottom> { post.title } </Typography>
      <CardContent>
        <Typography gutterBottom> { post.message } </Typography>
      </CardContent>
      <CardActions className={ classes.cardActions }>
        <Button size='small' color='primary' onClick={ () => {} }>
           <ThumbUpAlt fontSize='small' />
           Like
           { post.likeCount }
        </Button>
        <Button size='small' color='primary' onClick={ () => {} }>
           <Delete fontSize='small' />
           Delete
        </Button>
      </CardActions>
    </Card>
  )
}

export default Post