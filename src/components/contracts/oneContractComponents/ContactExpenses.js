import React, { Fragment } from 'react'

//Material UI
import { Grid, Button, TextField, FormControl, InputLabel } from '@mui/material'

export default function ContactExpenses() {
  return (
    <Grid container>
        <Grid item>
            <FormControl>
                <TextField label='Expense' type='number' />
            </FormControl>
        </Grid>
        <Grid item>
            <FormControl>
                <InputLabel>Description</InputLabel>
            </FormControl>
        </Grid>
        <Grid item>
            <Button variant='outlined'>Add Expense</Button>
        </Grid>
    </Grid>
  )
}
