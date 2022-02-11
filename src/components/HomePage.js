
import { useDispatch, useSelector } from 'react-redux'

//IMPORT FILES
import OpenContracts from './contracts/OpenContracts';
import TotalProgress from './progress/TotalProgress';

//IMPORT FUNCTIONS
import { loadContracts } from './store/contracts'

import { Grid, Typography } from '@mui/material'
import { loadAgents } from './store/agents'
import NavigateButton from './buttons/NavigateButton'
import LoginForm from './auth/LoginForm';

export default function HomePage() {
    const dispatch = useDispatch()

    //SELECTORS
    const user = useSelector(state => state.entities.user)
    const { loggedIn, currentUser } = user
    const contracts = useSelector(state => state.entities.contracts)
    const agents = useSelector(state => state.entities.agents)

    //LOAD ALL DATA
    if (loggedIn) {
        dispatch(loadContracts(currentUser._id))
        dispatch(loadAgents(currentUser._id))
    }

    if (!loggedIn) 
        return <LoginForm />

    if(contracts.loading || agents.loading)
        return <div>Loading...</div>

    return (
        <Grid container spacing={3} style={{ display: 'flex', justifyContent: 'center'}} >
            <Grid item xs={12} mb={3}><Typography variant='h4' align='center'> {currentUser.firstName} {currentUser.lastName}, {currentUser.companyName} </Typography></Grid>

            <TotalProgress />

            {/* OPEN CONTRACTS  */}
            <Grid container item xl={4} my={3}>
                <OpenContracts />
            </Grid>

            {/* CHANGE THESE BUTTONS TO ONE COMPONENT  */}
            <Grid container justifyContent='flex-end' spacing={3}>
                <NavigateButton route='/contracts/new' label='Add Contracts' />
            </Grid>
        </Grid>
    )
}
