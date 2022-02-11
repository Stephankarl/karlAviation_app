import { Button, Grid } from '@mui/material'
import { Link } from 'react-router-dom'

export default function NavigateButton({ route, label, state }) {
    return (
        <Grid item>
            <Link to={route} style={{ textDecoration: 'none' }} >
                <Button 
                    variant='contained'
                    color={state ? 'success' : 'primary'}
                    sx={{
                        width: '200px'
                    }}>
                        {label}
                </Button>
            </Link>
        </Grid>
    )
}
