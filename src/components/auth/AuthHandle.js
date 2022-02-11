import React from 'react';
import { Route } from 'react-router-dom'

//Import Files
import LoginForm from './LoginForm';
import RegisterUser from './RegisterUser'

//Material UI
import { Grid } from '@mui/material'

export default function AuthHandle() {
  return (
      <Grid container>
          <Route path='/' exact element={<LoginForm />} />
          <Route path='/register' exact element={<RegisterUser />} />
      </Grid>
  );
}
