import React, { useState, useEffect } from 'react'
import useStyle from './styles';
import { TextField, Typography, Button, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../../actions/posts';

const Form = ({currentId, setCurrentId}) => {

  // single post data coming from post updateBtn in Post component to fill original post data in form input.
    const post = useSelector( (state) => currentId ? state.posts.find(p => p._id === currentId) : null );
    // console.log(useSelector( state => state))

    const classes = useStyle();
    const dispatch = useDispatch();
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
    // get name from localstorage. not from the form
    const user = JSON.parse(localStorage.getItem('profile'));
    // console.log(user);

    const handleSubmit = (e) => {
       e.preventDefault();
       if(!currentId){
          dispatch(createPost({...postData, name: user?.result?.name }));
       } else {
          dispatch(updatePost(currentId, {...postData, name: user?.result?.name }))
       }
       clear();
    }

    const clear = () => {
      setCurrentId(null);
      setPostData({ title: '', message: '', tags: '', selectedFile: '' });
    };

    useEffect(() => {
      if(post) setPostData(post);
    }, [post]);

    if(!user?.result?.name) {
      return (
        <Paper className={classes.paper}>
          <Typography variant='h6' align='center'>Please sign in to create your own memory</Typography>
        </Paper>
      )
    }
    

  return (
    <Paper className={classes.paper}>
      <form className={`${classes.root} ${classes.form}`} autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Typography variant='h6'> { currentId ? `Editing ${post.title}` : `Creating A Memory`}</Typography>
        <TextField 
          name='title' 
          variant='outlined' 
          label='Title' 
          fullWidth 
          value={postData.title}
          onChange={ (e) => setPostData({ ...postData, title: e.target.value})}
          required
          autoComplete='off'

        />
        <TextField 
          name='message' 
          variant='outlined' 
          label='Message' 
          fullWidth 
          value={postData.message}
          onChange={ (e) => setPostData({ ...postData, message: e.target.value})}
          required
          autoComplete='off'
        />
        <TextField 
          name='tags' 
          variant='outlined' 
          label='Tags' 
          fullWidth 
          value={postData.tags}
          onChange={ (e) => setPostData({ ...postData, tags: e.target.value.split(`,`)})}
          required
          autoComplete='off'
        />
        <div className={classes.fileInput}>
          <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
        </div>
        <Button className={ classes.buttonSubmit } variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
        <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth >Clear</Button>
      </form>
    </Paper>

)}

export default Form