import React, { useEffect, useState } from 'react';
import { Container, Typography, AppBar, Grid, Grow } from '@material-ui/core'

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import useStyle from './style';

import { useDispatch } from 'react-redux'
import { getPost } from './actions/posts';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  const [currentId, setCurrentId] = useState(null)

  const classes = useStyle();
  const dispatch = useDispatch();

  useEffect( () => {
    dispatch(getPost())
  }, [dispatch, currentId]);

  return (
    <Container>
      <Navbar />
      <Grow in>
        <Container>
          <Grid className={classes.container} container direction="row" justifyContent="space-between" alignItems="stretch" spacing={2}>
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
