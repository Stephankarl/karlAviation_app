import { useSelector } from 'react-redux'

//IMPORT FUNCTIONS
import { getOneAgent } from '../store/agents'

//IMPORT MATERIAL UI
import { Card, CardHeader, CardContent, Grid, Typography } from '@mui/material';

export default function AgentCard({ id }) {
    const agent = useSelector(getOneAgent(id))

    return (
        <Grid item>
            <Card sx={{
                minWidth: '250px'
            }}>
                <CardHeader 
                    title={agent.companyName}
                    subheader={agent.nickName}
                />
                <CardContent>
                    {agent.contacts.map((person, i) => (
                        <Typography key={i}>{person.name}</Typography>
                    ))}
                </CardContent>
            </Card>
        </Grid>
    )
}
