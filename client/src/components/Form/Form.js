import React from 'react'
import useStyle from './styles';
import { TextField, Typography, Button, Paper } from '@material-ui/core'

const Form = () => {
    const classes = useStyle();

    const handleSubmit = () => {
      
    }

  return (
    <Paper>
      <form className={classes.form} autoComplete="off" noValidate onSubmit={handleSubmit}>

      </form>
    </Paper>

)}

export default Form