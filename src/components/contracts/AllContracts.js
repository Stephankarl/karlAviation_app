import { useSelector } from 'react-redux'

//Import files
import ContractCard from './ContractCard'
import LoginForm from '../auth/LoginForm'

//Material UI
import { Grid } from '@mui/material'

export default function AllContracts() {
    const contracts = useSelector(state => state.entities.contracts.list)
    const isLoggedIn = useSelector(state => state.entities.user.loggedIn)

    if (!isLoggedIn)
        return <LoginForm />

    return (
        <Grid container spacing={3}>
            { contracts.map(contract => (
                <ContractCard key={contract._id} id={contract._id} />
            ))}
        </Grid>
    )
}
