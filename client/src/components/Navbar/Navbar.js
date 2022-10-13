import React from 'react'
import { Typography, AppBar, Toolbar } from '@material-ui/core'
import { deepPurple } from '@material-ui/core/colors'
import { Link } from 'react-router-dom'
import memory from  '../../images/memory.avif'

import useStyle from './style.js'

const Navbar = () => {
  const classes = useStyle();

  return (
    <AppBar className={ classes.appBar } position='static' color='inherit'>
        <div className={classes.brandContainer}>
            <Typography className={ classes.heading } variant='h2' color='secondary' align='center'>Memories</Typography>
            <img className={ classes.image } src={memory} alt='memories' height="60" />
        </div>
        <Toolbar className={classes.toolbar}>

        </Toolbar>
    </AppBar>
  )
}

export default Navbar