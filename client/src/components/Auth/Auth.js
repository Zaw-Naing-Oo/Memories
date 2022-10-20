import React, { useState } from 'react'
import { Paper, Typography, Button, InputAdornment, Avatar, Container, Grid, TextField } from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'
import { GoogleLogin } from '@react-oauth/google'
import { useDispatch } from 'react-redux'
import  jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import useStyle from './style'
import Input from './Input'
import { signUp, singIn } from '../../actions/auth'

const Auth = () => {
    const classes = useStyle();
    const [isSignUp, setIsSignUp] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name] : e.target.value })
    };
    const handleSubmit = (e) => {
      e.preventDefault();

      if(isSignUp) {
        dispatch(signUp(formData, navigate))
      } else {
        dispatch(singIn(formData, navigate));
      }
      // console.log(formData);

    };

    const handleShowPassword = () => setShowPassword((prevPassword) => !prevPassword);

    const switchMode = () => {
        setIsSignUp((prev) => !prev);
        setShowPassword(false)
    };
    
    const onSuccess = (credentialResponse) => {
        // console.log(credentialResponse);
        const token = credentialResponse?.credential;
        const decode = jwt_decode(token);
        // console.log(decode);
        try {
          dispatch({ type: 'AUTH', data: {token, decode}});
          navigate('/')
        } catch (error) {
          console.log(error);
        }
    };

    const onError = () => {};
   

 


  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlined />
            </Avatar>
            <Typography variant='h5'>{ isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
               <Grid container spacing={2}>
                { isSignUp && (
                    <>
                      <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                      <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                    </>
                )}
                <Input name="email" label="Email Address" handleChange={handleChange} type="email"  />
                <Input name="password" label="Password" handleChange={handleChange} type={ showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}  />
                { isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
               </Grid>
               <Button type='submit' variant='contained' color='primary' className={classes.submit} fullWidth>
                { isSignUp ? 'Sign Up' : 'Sign In'}
               </Button> 

                {/* Google Login */}
                <div style={{ textAlign: 'center'}}>
                  <GoogleLogin
                      onSuccess={onSuccess}
                      onError={onError}
                  />

                </div>

               <Grid container justifyContent='flex-end'>
                  <Grid item>
                    <Button onClick={switchMode}>
                       { isSignUp ? 'Already have an accont sign In' : 'Do not have an account Sing Up' }
                    </Button>
                  </Grid>
               </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth