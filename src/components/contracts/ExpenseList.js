import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

//Material UI
import { Grid, Button, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

//Import Files
import DateSelector from '../formComponents/DateSelector'

//Import Functions
import { addExpenseToContract, getOneContract } from '../store/contracts'

export default function ContactExpenses() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const contract = useSelector(getOneContract(id))
    const expenses = contract.expenses

    const [newExpense, setNewExpense] = useState({
        date: Date.now(),
        amount: 0,
        description: ''
    })

    const expenseDescription = ['Airfare', 'Hotel', 'Meal', 'Taxi', 'Catering', 'Tip', 'Other']
    const handleChange = e => {
        setNewExpense({
            ...newExpense,
            [e.target.name]: e.target.value
        })
    }
 
  return (
    <Grid container justifyContent='center'>

        <Grid item xs={12} md={8}>
          <FormControl sx={{ my: 1, p: 1 }} fullWidth>
            <DateSelector values={newExpense} setValues={setNewExpense} name='date' label='Expense Date' />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={8}>
            <FormControl sx={{ my: 1, p: 1 }} fullWidth>
                <TextField label='Expense' type='number' name='amount' required onChange={handleChange}/>
            </FormControl>
        </Grid>
        <Grid item xs={12} md={8}>
            <FormControl sx={{ my: 1, p: 1 }} fullWidth>
                <InputLabel id="description">Description</InputLabel>
                <Select
                    id="description"
                    value={newExpense.description}
                    label="Description"
                    name='description'
                    required
                    onChange={handleChange}
                >
                    {expenseDescription.map((description, i) => (
                        <MenuItem key={i} value={description}>{description}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={12} md={8}>
            <Button variant='outlined' fullWidth sx={{ mt: 2 }} onClick={ () => {
                dispatch(addExpenseToContract(contract._id, newExpense))
            }}>Add Expense</Button>
        </Grid>

        { expenses.length > 0 && 
            <Grid container item xs={12}>
                {expenses.map(expense => (
                    <Grid item>
                        <Typography>{expense.date}</Typography>
                        <Typography>{expense.amount}</Typography>
                        <Typography>{expense.description}</Typography>
                    </Grid>
                ))}
            </Grid>
        }
    </Grid>
  )
}
