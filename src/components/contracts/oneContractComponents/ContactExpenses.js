import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

//Import Files
import NavigateButton from '../../buttons/NavigateButton'

//Import Functions
import { addTotalExpenseToContract, getOneContract } from '../../store/contracts'

//Material UI
import { Grid, FormControl, Input, InputAdornment, InputLabel, Radio, RadioGroup, FormControlLabel, FormLabel, Button, Typography } from '@mui/material'

export default function ContactExpenses() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const contract = useSelector(getOneContract(id))
    
    const [expenseType, setExpenseType] = useState('total')
    const [totalExpense, setTotalExpense] = useState(contract.totalExpense)

    const handleExpenseChange = e => {
        setTotalExpense(e.target.value)
    }

    const handleExpenseType = e => {
        setExpenseType(e.target.value)
    }

    return (
        <Grid container justifyContent='center'>
            <Grid container justifyContent='center' item xs={12} md={10} textAlign='center' sx={{ border: '1px solid #c5c5c5', py: 2, mt: 2 }} >
            <Typography variant='h5' mb={2} align='center'>Contract Expense</Typography>
                <Grid item xs={12}>
                    <FormControl>
                        <FormLabel>Expense Type</FormLabel>
                        <RadioGroup row onChange={handleExpenseType} value={expenseType}>
                            <FormControlLabel value="total" control={<Radio />} label="Total" />
                            <FormControlLabel value="single" control={<Radio />} label="Individual" />
                        </RadioGroup>
                    </FormControl>
                </Grid>

                { expenseType === 'total' && 
                <Grid item xs={8}>
                    <FormControl fullWidth variant="standard">
                        <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
                        <Input
                            id="standard-adornment-amount"
                            value={totalExpense}
                            onChange={handleExpenseChange}
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        />
                    </FormControl>
                    <Button variant='outlined' fullWidth size='small' sx={{ mt: 2 }} onClick={() => dispatch(addTotalExpenseToContract(id, totalExpense))}>Save</Button>
                </Grid>
                    
                }
                { expenseType === 'single' && 
                    <Grid item xs={8} mt={2}>
                        <NavigateButton route={`/contracts/${id}/expenses`} label='Contract Expenses' variant='outlined' />
                    </Grid>
                }
            </Grid>
        </Grid>
    )
}
