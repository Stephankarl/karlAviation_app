import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

//Import files  
import DateSelector from '../../formComponents/DateSelector'
import NavigateButton from '../../buttons/NavigateButton'

//Import Functions
import { getOneContract, updateContractDaysAndRate } from '../../store/contracts'

//Material UI
import { Grid, FormControl, Input, InputLabel, InputAdornment, FormControlLabel, Checkbox, Button, Typography } from '@mui/material'

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

  return (
    <Grid container justifyContent='center'>
      <Grid container item xs={12} md={10} sx={{ border: '1px solid #c5c5c5', p: 2 }} >
        <Grid item xs={12} my={3}>
          <Typography variant='h5' align='center'>Update Contract</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl sx={{ my: 1, p: 1 }} fullWidth>
            <DateSelector values={contractState} setValues={setContractState} name='startDate' label='Start Date' />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl sx={{ my: 1, p: 1 }} fullWidth>
            <DateSelector values={contractState} setValues={setContractState} name='endDate' label='End Date' />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl sx={{ my: 1, p: 1 }} fullWidth>
            {/* <TextField variant='standard' size='small' name='rate' value={contractState.rate} label='Rate' onChange={handleChange} /> */}
            <FormControl variant="standard">
              <InputLabel>Rate</InputLabel>
              <Input
                  name='rate'
                  value={contractState.rate}
                  onChange={handleChange}
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
              />
            </FormControl>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} textAlign='center'>
          <FormControl sx={{ my: 1 }}>
            <FormControlLabel control={<Checkbox name='retainer' checked={contractState.retainer} onChange={handleChange} />} label="Retainer" />
          </FormControl>
        </Grid>
        <Grid item xs={12} textAlign='center'>
          <Button variant='outlined' sx={{ width: '50%' }} onClick={handleUpdate}>Update</Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
