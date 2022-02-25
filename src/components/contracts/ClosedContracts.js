import { useSelector } from 'react-redux'
import moment from 'moment'

//Import files
import ContractCard from './ContractCard'
import LoginForm from '../auth/LoginForm'

//Import Functions
import { getYearlyContracts } from '../store/contracts'

//Material UI
import { Grid } from '@mui/material'

export default function ClosedContracts() {
    const contracts = useSelector(getYearlyContracts(moment().format('YYYY')))
    const isLoggedIn = useSelector(state => state.entities.user.loggedIn)

    if (!isLoggedIn)
        return <LoginForm />

    return (
        <Grid container spacing={3}>
            { contracts.map(contract => {
                if (!contract.open) {
                    return <ContractCard key={contract._id} id={contract._id} />
                } else {
                    return null
                }
            })}
        </Grid>
    )
}
