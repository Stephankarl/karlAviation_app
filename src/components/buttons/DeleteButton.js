import React, { useState, Fragment } from 'react'
import { useDispatch } from 'react-redux'

//Import functions
import { deleteContract } from '../store/contracts'

//Material UI
import { Grid, IconButton, Paper, Popover, Typography, Button } from '@mui/material'
//Material Icons
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function DeleteButton({ contractId }) {
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

    const open = Boolean(anchorEl);
  return (
    <Fragment>
        <IconButton onClick={handleClick}>
            <DeleteForeverIcon color='error' />
        </IconButton>
        <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
            <Paper>
            <Grid container style={{ display: 'flex', justifyContent: 'center', maxWidth: '300px'}}>
                <Grid item xs={12}>
                    <Typography variant='h6' align='center' p={2}>Are you sure you want to delete this contract?</Typography>
                </Grid>
                <Grid item p={2}>
                    <Button variant='outlined' sx={{ m: 1 }} onClick={handleClose}>Cancel</Button>
                    <Button variant='contained' color='error' sx={{ m: 1 }} onClick={() => dispatch(deleteContract(contractId))}>YES</Button>
                </Grid>
            </Grid>
            </Paper>
        </Popover>
    </Fragment>
  )
}