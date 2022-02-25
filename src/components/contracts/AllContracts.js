import { useSelector } from 'react-redux'
import moment from 'moment'

//Import files
import ContractCard from './ContractCard'
import LoginForm from '../auth/LoginForm'

//Import Functions
import { getYearlyContracts } from '../store/contracts'

//Material UI
import { Grid, Typography } from '@mui/material'

export default function AllContracts() {
    const contracts = useSelector(getYearlyContracts(moment().format('YYYY')))
    const prevYearContracts = useSelector(getYearlyContracts(moment().subtract(1, 'years').format('YYYY')))
    const isLoggedIn = useSelector(state => state.entities.user.loggedIn)

    if (!isLoggedIn)
        return <LoginForm />

    return (
        <Grid container spacing={3}>

            { prevYearContracts.length > 0 && 
                prevYearContracts.map(contract => (
                    <Grid container spacing={3} item>
                        <Grid item xs={12}>
                            <Typography variant='h5'>{moment().subtract(1, 'years').format('YYYY')}</Typography>
                        </Grid>
                        <ContractCard key={contract._id} id={contract._id} />
                    </Grid>
                ))
            }

            { contracts.map(contract => (
                <Grid container spacing={3} item>
                    <Grid item xs={12}>
                        <Typography variant='h5'>{moment().format('YYYY')}</Typography>
                    </Grid>
                    <ContractCard key={contract._id} id={contract._id} />
                </Grid>
            ))}
        </Grid>
    )
}
