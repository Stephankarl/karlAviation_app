import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import NumberFormat from 'react-number-format'

//Import files  
import DateSelector from '../../formComponents/DateSelector'

//Import Functions
import { getOneContract, updateContractDaysAndRate, addExpenseToContract } from '../../store/contracts'

//Material UI
import { Grid, FormControl, TextField, FormControlLabel, Checkbox, Button, Typography } from '@mui/material'

export default function DateAndRateUpdate() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const contract = useSelector(getOneContract(id))

    const [contractState, setContractState] = useState({
        expense: 0,
        startDate: new Date(contract.startDate),
        endDate: new Date(contract.endDate),
        rate: contract.rate,
        retainer: contract.retainer
    })

    //Handle all State changes
    const handleChange = e => {
        if (e.target.name === 'retainer') {
            setContractState({
                ...contractState,
                retainer: !contractState.retainer
            })
        } else {
            setContractState({
                ...contractState,
                [e.target.name]: e.target.value
            })
        }
    }

    //Handle Date and Rate Update
    const handleUpdate = () => {
        dispatch(updateContractDaysAndRate(contract._id, {
            startDate: Date.parse(contractState.startDate),
            endDate: Date.parse(contractState.endDate),
            rate: contractState.rate,
            retainer: contractState.retainer
        }))
    }

    //Handle the expense
    const handleExpenseAdd = () => {
      dispatch(addExpenseToContract(contract._id, contractState.expense))
      setContractState({
          ...contractState,
          expense: 0
      })
  }

  return (
      <Grid container>
        <Grid item xs={12} m={3}>
          <Typography variant='h5' align='center'>Update Contract</Typography>
        </Grid>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center'}}>
              <FormControl sx={{ m: 2, minWidth: '250px' }}>
                <DateSelector values={contractState} setValues={setContractState} name='startDate' label='Start Date' />
              </FormControl>
              <FormControl sx={{ m: 2, minWidth: '250px' }}>
                <DateSelector values={contractState} setValues={setContractState} name='endDate' label='End Date' />
              </FormControl>
          </Grid>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center'}}>
              <FormControl sx={{ m: 2, minWidth: '250px' }}>
                <TextField name='rate' value={contractState.rate} label='Rate' onChange={handleChange} />
              </FormControl>
              <FormControl sx={{ m: 2, minWidth: '250px' }}>
                <FormControlLabel control={<Checkbox name='retainer' checked={contractState.retainer} onChange={handleChange} />} label="Retainer" />
              </FormControl>
          </Grid>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center'}}>
            <Button variant='outlined' size='small' fullWidth sx={{ width: '50%' }} onClick={handleUpdate}>Update</Button>
          </Grid>

          <Grid item xs={12} m={3} style={{ display: 'flex', justifyContent: 'center'}}>
            <Typography variant='h5' align='center'>Add Expense</Typography>
          </Grid>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center'}}>
            <FormControl sx={{ m: 2, minWidth: '250px' }}>
              <TextField name='expense' value={contractState.expense} label='Expense' onChange={handleChange} />
            </FormControl>
            <FormControl sx={{ m: 2, minWidth: '250px' }}>
              <Button variant='outlined' sx={{ m: 2 }} onClick={handleExpenseAdd}>Add</Button>
            </FormControl>
          </Grid>


          <Grid container item >
            <Grid item xs={12} m={3}>
                <Typography variant='h5' align='center'>Contract Summary</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography align='center'>Created Date</Typography>
                <Typography align='center'>Start Date</Typography>
                <Typography align='center'>End Date</Typography>
                <Typography align='center'>Total Days</Typography>
                <Typography align='center'>Retainer</Typography>
                <Typography align='center'>Rate</Typography>
                <Typography align='center'>Total Income</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography align='center'>{moment(contract.createdDate).format('DD MMM YYYY')}</Typography>
                <Typography align='center'>{moment(contract.startDate).format('DD MMM YYYY')}</Typography>
                <Typography align='center'>{moment(contract.endDate).format('DD MMM YYYY')}</Typography>
                <Typography align='center'>{contract.totalDays}</Typography>
                <Typography align='center'>{ contract.retainer ? 'YES' : 'NO' }</Typography>
                <Typography align='center'><NumberFormat value={contract.rate} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Typography>
                <Typography align='center'><NumberFormat value={contract.totalIncome} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} m={3}>
              <Typography variant='h5' align='center'>Expenses</Typography>
          </Grid>
          <Grid item xs={6}>
              { contract.expenses.map(expense => (
                  <Typography key={expense._id} align='center'>Submit Date: {moment(expense.submitDate).format('DD MMM')}</Typography>
              ))}
          </Grid>
          <Grid item xs={6}>
              { contract.expenses.map(expense => (
                  <Typography key={expense._id} align='center'><NumberFormat value={expense.amount} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Typography>
              ))}
          </Grid>
      </Grid>
  )
}
