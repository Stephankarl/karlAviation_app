
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import moment from 'moment'

//IMPORT FILE
import AgentSelector from '../formComponents/AgentSelector'
import DateAndRateUpdate from './oneContractComponents/DateAndRateUpdate'
import InvoiceContract from './oneContractComponents/InvoiceContract'
import ContractExpenses from './oneContractComponents/ContactExpenses'
// import ContractFinalInfo from './oneContractComponents/ContractFinalInfo'
import Payment from './oneContractComponents/Payment'
import ContractControls from './oneContractComponents/ContractControls'

//IMPORT FUCNTIONS
import { getOneContract } from '../store/contracts'
import { getOneAgent } from '../store/agents'

//MATERIAL UI
import { Grid, Typography } from '@mui/material'

export default function OneContract() {
    const { id } = useParams()
    const contract = useSelector(getOneContract(id))
    const agent = useSelector(getOneAgent(contract.agent))

    return (
        <Grid container>
            <Grid item xs={12} mb={3}>
                {contract.agent ? <Typography variant='h4' align='center' >{agent.companyName}</Typography> : <AgentSelector contractId={id} />}
                <Typography align='center' >{moment(contract.startDate).format('DD MMM')} - {moment(contract.endDate).format('DD MMM')}</Typography>
            </Grid>
            
            <Grid container item xs={12} >
                <Grid item xs={12} md={6}>
                    <DateAndRateUpdate />
                    <ContractExpenses />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InvoiceContract  />
                </Grid>
                <Grid item xs={12} md={6}>
                    <ContractControls />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Payment />
                </Grid>

                {/* <ContractFinalInfo   /> */}
                
            </Grid>
        </Grid>
    )
}
