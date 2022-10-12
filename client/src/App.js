import React, { useEffect, useState } from 'react';
import { Container, Typography, AppBar, Grid, Grow } from '@material-ui/core'

import memory from '../src/images/memory.avif'
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import useStyle from './style';

import { useDispatch } from 'react-redux'
import { getPost } from './actions/posts';

const App = () => {
  const [currentId, setCurrentId] = useState(null)

  const classes = useStyle();
  const dispatch = useDispatch();

  useEffect( () => {
    dispatch(getPost())
  }, [dispatch, currentId]);

  return (
    <Container>
      <AppBar className={ classes.appBar } position='static' color='inherit'>
       <Typography className={ classes.heading } variant='h2' color='secondary' align='center'>Memories</Typography>
       <img className={ classes.image } src={memory} alt='memories' height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container direction="row" justifyContent="space-between" alignItems="stretch">
            <Grid item xs={12} sm={7}>
               <Posts currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId}  />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
}

export default App
