import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

//Import files
import DateSelector from '../../formComponents/DateSelector'

//Import func
import { getOneContract, receivePayment } from '../../store/contracts'

//Material UI
import { Grid, RadioGroup, Radio, FormControl, FormControlLabel, Typography, Button, InputLabel, OutlinedInput, InputAdornment, Stack } from '@mui/material'

export default function Payment() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const contract = useSelector(getOneContract(id))
    const [payment, setPayment] = useState({
        amount: contract.invoice.invoiceTotal || 0,
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
        payment.payDate.setHours(0,0,0,0)
        const pay = {
            ...payment,
            payDate: Date.parse(payment.payDate)
        }
        dispatch(receivePayment(contract._id, pay))
    }

    if(contract.invoice.invoiced && !contract.payment.paymentComplete) {
        return (
            <Grid container justifyContent='center'>
                <Grid container item xs={12} md={10} sx={{ border: '1px solid #c5c5c5', p: 2 }}>
                    <Grid item xs={12}><Typography variant='h5' mb={2} align='center'>Payment</Typography></Grid>
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center'}}>
                        <Stack spacing={2}>
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
                                    <FormControlLabel value='1099' control={<Radio />} label='1099' sx={{ px: 2 }} />
                                    <FormControlLabel value='w2' control={<Radio />} label='W2' sx={{ px: 2 }} />
                                </RadioGroup>
                            </FormControl>
                            <Button variant='outlined' onClick={handlePayment}>Pay Contract</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
        )
    } else {
        return null
    }
}
