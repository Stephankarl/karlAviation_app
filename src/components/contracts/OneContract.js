import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import moment from 'moment'

//IMPORT FILE
import AgentSelector from '../formComponents/AgentSelector'
import ContractStepper from './oneContractComponents/ContractStepper'
import DateAndRateUpdate from './oneContractComponents/DateAndRateUpdate'
import InvoiceContract from './oneContractComponents/InvoiceContract'
import ContractFinalInfo from './oneContractComponents/ContractFinalInfo'

//IMPORT FUCNTIONS
import { getOneContract } from '../store/contracts'
import { getOneAgent } from '../store/agents'

//MATERIAL UI
import { Grid, Typography } from '@mui/material'
import Payment from './oneContractComponents/Payment'

export default function OneContract() {
    const { id } = useParams()
    const contract = useSelector(getOneContract(id))
    const agent = useSelector(getOneAgent(contract.agent))

    const [activeStep, setActiveStep] = useState(() => {
        if (!contract.complete.completed)
            return 0
        if (contract.complete.completed && !contract.invoice.invoiced)
            return 1
        if (contract.invoice.invoiced && !contract.payment.paymentComplete)
            return 2
        if (contract.payment.paymentComplete && contract.open)
            return 3
        if (!contract.open)
            return 4
    })

    const handleBack = () => {
        setActiveStep(prevStep => prevStep - 1)
    }

    const handleForward = () => {
        setActiveStep(prevStep => prevStep + 1)
    }

    return (
        <Grid container>
            <Grid item xs={12} mb={3}>
                {contract.agent ? <Typography variant='h4' align='center' >{agent.companyName}</Typography> : <AgentSelector contractId={id} />}
                <Typography align='center' >{moment(contract.startDate).format('DD MMM')} - {moment(contract.endDate).format('DD MMM')}</Typography>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
                <ContractStepper activeStep={activeStep} handleBack={handleBack} handleForward={handleForward} />
            </Grid>
            <Grid item xs={12} md={8}>
                { activeStep === 0 && 
                    <DateAndRateUpdate />
                }
                { activeStep === 1 &&
                    <InvoiceContract handleForward={handleForward} />
                }
                { activeStep === 2 && 
                    <Payment handleForward={handleForward}/>
                }
                { activeStep === 3 && 
                    <ContractFinalInfo handleBack={handleBack} handleForward={handleForward} />
                }
                { activeStep === 4 && 
                    <ContractFinalInfo />
                }
            </Grid>
        </Grid>
    )
}
