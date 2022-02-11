import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import moment from 'moment'

//Import Files
import DateSelector from '../../formComponents/DateSelector';

//Import functions
import { getOneContract, getInvoicedContracts, createInvoice } from '../../store/contracts'
import { getOneAgent } from '../../store/agents'

//Material UI
import { Grid, Typography, TextField, FormControl, Button, FormControlLabel, RadioGroup, Radio } from '@mui/material'

export default function InvoiceContract({ handleForward }) {
    const dispatch = useDispatch()
    // const navigate = useNavigate()
    const { id } = useParams()
    const contract = useSelector(getOneContract(id))
    const agent = useSelector(getOneAgent(contract.agent))
    const invoicedContracts = useSelector(getInvoicedContracts)
    const user = useSelector(state => state.entities.user.currentUser)

    const [invoiceDetails, setInvoiceDetails] = useState({
        invoiceNumber: contract.invoice.invoiceNumber,
        contactPerson: agent.contacts[0].name,
        invoiceDate: new Date(),
        contractReference: contract.invoice.invoiceReference || '',
        airplane: contract.airplane || '',
        invoiceAddress: contract.invoice.invoiceAddress || ''
    })

    if (!invoiceDetails.invoiceNumber) {
        const invoiceNumber = `${invoicedContracts.length + 1}-${moment(contract.startDate).format('YYYYMMDD')}`
        setInvoiceDetails({
            ...invoiceDetails,
            invoiceNumber
        })
    }

    const handleChange = e => {
        setInvoiceDetails({
            ...invoiceDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleCreateInvoice = () => {
        const invoiceInfo = {
            ...contract,
            invoice: {
                ...contract.invoice,
                invoiced: true,
                invoiceDate: Date.parse(invoiceDetails.invoiceDate),
                invoiceNumber: invoiceDetails.invoiceNumber,
                invoiceAddress: invoiceDetails.invoiceAddress,
                invoiceReference: invoiceDetails.contractReference,
                contactPerson: invoiceDetails.contactPerson,
            },
            agent, user,
            airplane: invoiceDetails.airplane,
        }
        dispatch(createInvoice(contract._id, invoiceInfo))
        // navigate(`/contracts/${contract._id}`, { exact: true })
        handleForward()
    }
    

    return (
        <Grid container spacing={3} style={{ display: 'flex', justifyContent: 'center'}}>
            <Grid item xs={12} m={3}>
                <Typography variant='h5' align='center'>Invoice Information</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <DateSelector values={invoiceDetails} setValues={setInvoiceDetails} name='invoiceDate' label='Invoice Date' />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField fullWidth name='invoiceNumber' value={invoiceDetails.invoiceNumber} onChange={handleChange} label='Invoice Number' />
            </Grid>
            <Grid item xs={12}>
                <Typography variant='h6'>Who is your contract person?</Typography>
                <FormControl>
                    <RadioGroup
                        defaultValue={agent.contacts[0].name}
                        name="contactPerson"
                        onChange={handleChange}
                    >
                        {agent.contacts.map((contact, i) => (
                            <FormControlLabel key={i} value={contact.name} control={<Radio />} label={contact.name} />
                        ))}
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={8} md={6}>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <TextField name='contractReference' value={invoiceDetails.contractReference} onChange={handleChange} label='Contract Reference' />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <TextField name='invoiceAddress' value={invoiceDetails.invoiceAddress} onChange={handleChange} label='Company Address' />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <TextField name='airplane' value={invoiceDetails.airplane} onChange={handleChange} label='Airplane' />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <Button variant='contained' onClick={handleCreateInvoice}>Create Invoice</Button>
                </FormControl>
            </Grid>
        </Grid>
    )
}
