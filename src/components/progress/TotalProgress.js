import { useSelector } from 'react-redux'
import moment from 'moment'

//Import functions
import { getYearlyContracts } from '../store/contracts'

//Material UI
import { Box, Grid, CircularProgress, Typography } from '@mui/material'

export default function TotalProgress() {
    const contracts = useSelector(getYearlyContracts(moment().format('YYYY')))
    const target = useSelector(state => state.entities.user.currentUser.target)

    const percentageCalc = () => {
        let progress = 0
        contracts.forEach(contract => {
            progress += parseFloat(contract.totalIncome)
        })
        return progress/target * 100 
    }

    const progressCalc = () => {
        let progress = 0
        contracts.forEach(contract => {
            progress += parseFloat(contract.totalIncome)
        })
        return parseInt(progress)
    }

  return (
      <Grid item>
        <Typography variant='h6' align='center' mb={2}>Total Progress</Typography>
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" size={200} value={percentageCalc()} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="h4" component="div" color="text.secondary">
                    {`${parseFloat(progressCalc()/1000).toFixed(1)}K`}
                </Typography>
            </Box>
        </Box>
      </Grid>
  );
}