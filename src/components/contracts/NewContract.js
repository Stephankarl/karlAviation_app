import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//IMPORT FILES
import DateSelector from '../formComponents/DateSelector'

//IMPORT FUNCTIONS
import { addContract } from '../store/contracts';

//FORM STYLING
import { Button, Grid, Typography, TextField, FormControl, FormControlLabel, Checkbox } from '@mui/material';

export default function NewContract() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userId = useSelector(state => state.entities.user.currentUser._id)

    const [values, setValues] = useState({
        userId: userId,
        retainer: false,
        rate: 2000,
        startDate: new Date(),
        endDate: new Date()
    })

    const handleChange = e => {
        if (e.target.name === 'retainer'){
            setValues({
                ...values,
                retainer: !values.retainer
            })
        } else {
            setValues({
                ...values,
                [e.target.name]: e.target.value
            })
        }
    };

    const handleSubmit = () => {
        //BUILD NEW CONTRACT
        values.startDate.setHours(0,0,0,0)
        values.endDate.setHours(0,0,0,0)
        
        const newContract = {
            ...values,
            startDate: Date.parse(values.startDate),
            endDate: Date.parse(values.endDate)
        }

        //Dispatch Action
        dispatch(addContract(newContract))
        navigate(`/`)
    }

    return (

        <Grid container style={{ display: 'flex', justifyContent: 'center' }}>
            <Grid item xs={12}>
                <Typography variant='h4' align='center' mb={3} >New Contract</Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <FormControl fullWidth sx={{ m: 2 }}>
                    <DateSelector values={values} setValues={setValues} name='startDate' label='Start Date' />
                </FormControl>
                <FormControl fullWidth sx={{ m: 2 }}>
                    <DateSelector values={values} setValues={setValues} name='endDate' label='End Date' />
                </FormControl>
                <FormControl fullWidth sx={{ m: 2 }}>
                    <FormControlLabel control={<Checkbox name='retainer' checked={values.retainer} onChange={handleChange} />} label="Retainer" />
                </FormControl>
                <FormControl fullWidth sx={{ m: 2 }}>
                    <TextField name='rate' label="Rate" variant="outlined" value={values.rate} onChange={handleChange} />
                </FormControl>
                <FormControl fullWidth sx={{ m: 2 }}>
                    <Button onClick={handleSubmit} variant='contained'>Add Contract</Button>
                </FormControl>
            </Grid>
            
        </Grid>
        
    )
}
