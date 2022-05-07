import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

//Import Functions
import { loginUser } from '../store/users'

//Material UI
import MuiAlert from '@mui/material/Alert';
import { Grid, TextField, Typography, FormControl, Button, Snackbar } from '@mui/material'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function LoginForm() {
const dispatch = useDispatch()
const navigate = useNavigate()
const userLoggedIn = useSelector(state => state.entities.user.loggedIn)
const message = useSelector(state => state.entities.user.message)

useEffect(() => {
    if(userLoggedIn) 
    //This is going to change to OPEN Contracts
        navigate('/')
    
}, [userLoggedIn, navigate])

const [formData, setFormData] = useState({
    email: 'stephanglobals@gmail.com',
    password: 'Aviator007'
})

const handleChange = e => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })
}

const handleSubmit = () => {
    dispatch(loginUser(formData))
}

const [snack, setSnack] = useState(message)

useEffect(() => {
    setSnack(message)
}, [message])

    return (
        <Grid container style={{ display: 'flex', justifyContent: 'center' }}>
            <Grid item xs={12} sm={8} md={4}>
                <Typography variant='h4' my={3} align='center'>LOGIN</Typography>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <TextField name='email' label="Email" variant="outlined" value={formData.email} onChange={handleChange} type='email' />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <TextField name='password' label="Password" variant="outlined" value={formData.password} onChange={handleChange} type='password' />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <Button variant='contained' onClick={handleSubmit}>LOGIN</Button>
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <Button variant='outlined' size='small' onClick={() => navigate('/register')}>Register</Button>
                </FormControl>
            </Grid>
            { snack && 
                <Snackbar open={true} autoHideDuration={6000}>
                    <Alert severity={snack.type}>{snack.msg}</Alert>
                </Snackbar>
            }
        </Grid>
    )
}
