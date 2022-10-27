import React,{ useState, useEffect } from 'react'
import { Typography, AppBar, Toolbar, Avatar, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import memory from  '../../images/memory.avif'
import { googleLogout } from '@react-oauth/google'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { LOGOUT } from '../../actionNames/actions'
import decode from 'jwt-decode'

import useStyle from './style.js'

const Navbar = () => {
  const classes = useStyle();
  const [user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
     googleLogout();
     dispatch({ type: LOGOUT});
     setUser(null);
     navigate('/');
  }

  useEffect( () => {
    
    const token = user?.token;
    if(token) {
      const decodeToken = decode(token);
      if(decodeToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location])

  return (
    <AppBar className={ classes.appBar } position='static' color='inherit'>
        <div className={classes.brandContainer}>
            <Typography component={Link} to="/" className={ classes.heading } variant='h2' color='secondary' align='center'>Memories</Typography>
            <img className={ classes.image } src={memory} alt='memories' height="60" />
        </div>
        <Toolbar className={classes.toolbar}>
            { user ? (
               <div className={classes.profile}>
                
                  {/* user result comes from custom login and user decode comes from google login */}
                <Avatar alt={user.result ? user.result?.name : user.decode?.name} src={user.result ? user.result?.name[0] : user.decode?.name[0]} className={classes.purple} />
                <Typography className={classes.userName}>{user.result ? user.result?.name : user.decode?.name}</Typography>

                <Button variant='contained' className='' color='secondary' onClick={logout}>Logout </Button>
               </div>
            ) : (
              <Button variant='contained' component={Link} to="/auth" color='primary'>Sign In</Button>
            )}
        </Toolbar>
    </AppBar>
  )
}

export default Navbar