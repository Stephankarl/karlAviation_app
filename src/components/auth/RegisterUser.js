import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

//Import functions
import { registerUser } from '../store/users'

//Material UI
import MuiAlert from '@mui/material/Alert';
import { Grid, FormControl, TextField, Typography, Button, Snackbar } from '@mui/material'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function RegisterUser() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLoggedIn = useSelector(state => state.entities.user.loggedIn)
    const message = useSelector(state => state.entities.user.message)
    const user = useSelector(state => state.entities.user.currentUser)

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        code: ''
    })

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleRegister = async () => {
        dispatch(registerUser(formData))
    }

    useEffect(() => {
        if (isLoggedIn)
            navigate(`/profile/${user._id}`)
    }, [isLoggedIn, user, navigate])

    const [snack, setSnack] = useState(message)

    useEffect(() => {
        setSnack(message)
    }, [message])

  return (
    <Grid container style={{ display: 'flex', justifyContent: 'center'}}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
            <Typography variant='h4' align='center' mb={3}>REGISTER</Typography>
            <FormControl fullWidth sx={{ m: 1 }}>
                <TextField name='firstName' label='First Name' required onChange={handleChange} />
            </FormControl>
            <FormControl required fullWidth sx={{ m: 1 }}>
                <TextField name='lastName' label='Last Name' required onChange={handleChange} />
            </FormControl>
            <FormControl required fullWidth sx={{ m: 1 }}>
                <TextField name='email' label='Email' required type='email' onChange={handleChange} />
            </FormControl>
            <FormControl required fullWidth sx={{ m: 1 }}>
                <TextField name='password' label='Password' required type='password' onChange={handleChange} />
            </FormControl>
            <FormControl required fullWidth sx={{ m: 1 }}>
                <TextField name='code' label='Code' required onChange={handleChange} />
            </FormControl>
            <FormControl required fullWidth sx={{ m: 1 }}>
                <Button variant='contained' onClick={handleRegister} fullWidth>Register</Button>
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
