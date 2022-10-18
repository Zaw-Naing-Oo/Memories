import React,{ useState } from 'react'
import { Typography, AppBar, Toolbar, Avatar, Button } from '@material-ui/core'
import { deepPurple } from '@material-ui/core/colors'
import { Link } from 'react-router-dom'
import memory from  '../../images/memory.avif'

import useStyle from './style.js'

const Navbar = () => {
  const classes = useStyle();
  const [user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')));
  // console.log(user);

  return (
    <AppBar className={ classes.appBar } position='static' color='inherit'>
        <div className={classes.brandContainer}>
            <Typography component={Link} to="/" className={ classes.heading } variant='h2' color='secondary' align='center'>Memories</Typography>
            <img className={ classes.image } src={memory} alt='memories' height="60" />
        </div>
        <Toolbar className={classes.toolbar}>
            { user ? (
               <div className={classes.profile}>
                <Avatar alt={user.decode.name} src={user.decode.picture} className={classes.purple} />
                <Typography className={classes.userName}>{ user.decode.name }</Typography>
                <Button variant='contained' className='' color='secondary'>Logout </Button>
               </div>
            ) : (
              <Button variant='contained' component={Link} to="/auth" color='primary'>Sign In</Button>
            )}
        </Toolbar>
    </AppBar>
  )
}

export default Navbar