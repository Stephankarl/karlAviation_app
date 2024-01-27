import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

//IMPORT FILES
import AgentCard from './AgentCard'
import NavigateButton from '../buttons/NavigateButton'
import LoginForm from '../auth/LoginForm'

//MATERIAL UI
import { Grid } from '@mui/material'

export default function AllAgents() {
    const agents = useSelector(state => state.entities.agents.list)
    const isLoggedIn = useSelector(state => state.entities.user.loggedIn)

    if (!isLoggedIn)
        return <LoginForm />
        
    return (
        <Grid container spacing={3}>
            {agents.map(agent => (
                <Grid key={agent._id} item xs={12} sm={6} md={4} lg={3}>
                    <Link to={`/agents/${agent._id}`} style={{
                        textDecoration: 'none'
                    }}>
                            <AgentCard id={agent._id} />
                    </Link>
                </Grid>
            ))}
            <Grid container item justifyContent='flex-end' spacing={3}>
                <NavigateButton route='/agents/new' label='Add Agent' />
            </Grid>
        </Grid>
    )
}
