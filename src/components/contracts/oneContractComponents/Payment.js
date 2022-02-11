import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

//Import files
import DateSelector from '../../formComponents/DateSelector'

//Import func
import { getOneContract, receivePayment } from '../../store/contracts'

//Material UI
import { Grid, RadioGroup, Radio, FormControl, FormControlLabel, Typography, Button, InputLabel, OutlinedInput, InputAdornment, Stack } from '@mui/material'

export default function Payment({ handleForward }) {
    const { id } = useParams()
    const dispatch = useDispatch()
    const contract = useSelector(getOneContract(id))
    const [payment, setPayment] = useState({
        amount: contract.payment.owed,
        paymentType: contract.payment.paymentType,
        payDate: new Date()
    });

    const handleChange = e => {
        setPayment({
            ...payment,
            [e.target.name]: e.target.value
        })
    }

    const handlePayment = () => {
        const pay = {
            ...payment,
            payDate: Date.parse(payment.payDate)
        }
        dispatch(receivePayment(contract._id, pay))
        handleForward()
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}><Typography variant='h5' align='center'>Payment</Typography></Grid>
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center'}}>
                <Stack spacing={3}>
                    <DateSelector values={payment} setValues={setPayment} name='payDate' label='Day Paid' />

                    <FormControl fullWidth>
                        <InputLabel>Amount</InputLabel>
                        <OutlinedInput
                            value={payment.amount}
                            name='amount'
                            onChange={handleChange}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            label="Amount"
                        />
                    </FormControl>

                    <FormControl>
                        <RadioGroup row name='paymentType' value={payment.paymentType} onChange={handleChange}>
                            <FormControlLabel value='1099' control={<Radio />} label='1099' sx={{ p: 2 }} />
                            <FormControlLabel value='w2' control={<Radio />} label='W2' sx={{ p: 2 }} />
                        </RadioGroup>
                    </FormControl>
                    <Button variant='outlined' onClick={handlePayment}>Pay Contract</Button>
                </Stack>
            </Grid>
        </Grid>
    )
}
