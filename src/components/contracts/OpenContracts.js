import { useSelector } from 'react-redux'

//IMPORT FILES
import ContractCard from './ContractCard'

//IMPORT FUNCTIONS
import { getOpenContracts } from '../store/contracts'

//MATERIAL UI
import { Grid, Typography } from '@mui/material'

export default function OpenContracts() {
    //Get all open contracts for user
    const contracts = useSelector(getOpenContracts)

    if (contracts.length === 0) {
        return (
            <Grid container>
                <Typography variant='h4' align='center' >There are no open contracts</Typography>
            </Grid>
        )
    }

    return (
        <Grid container spacing={3} >
            { contracts.map(contract => (
                <ContractCard key={contract._id} id={contract._id} />
            ))}
        </Grid>
        
    )
}
