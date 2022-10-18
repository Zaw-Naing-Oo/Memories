import React, { useState, useEffect} from 'react'
import { Container, Grid, Grow } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { getPost } from '../../actions/posts'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import useStyle from './style';

const Home = () => {

    const [currentId, setCurrentId] = useState(null)

    const classes = useStyle();
    const dispatch = useDispatch();
  
    useEffect( () => {
      dispatch(getPost())
    }, [dispatch, currentId]);

  return (
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
  )
}

export default Home