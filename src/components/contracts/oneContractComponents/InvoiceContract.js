import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import moment from 'moment'

//Import Files
import DateSelector from '../../formComponents/DateSelector';
import AddressInput from '../../formComponents/AddressInput';

//Import functions
import { getOneContract, getInvoicedContracts, createInvoice } from '../../store/contracts'
import { getOneAgent } from '../../store/agents'

//Material UI
import { Grid, Typography, TextField, FormControl, Button, FormControlLabel, RadioGroup, Radio, FormLabel } from '@mui/material'

export default function InvoiceContract() {
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
        invoiceAddress: {
            street: contract.invoice.invoiceAddress.street,
            city: contract.invoice.invoiceAddress.city,
            state: contract.invoice.invoiceAddress.state,
            zip: contract.invoice.invoiceAddress.zip
        }
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
        invoiceDetails.invoiceDate.setHours(0,0,0,0)
        const invoiceInfo = {
            ...contract,
            invoice: {
                ...contract.invoice,
                invoiceCreated: true,
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
    }

    if (contract.complete.completed) {
        return (
            <Grid container justifyContent='center'>
                <Grid container item xs={12} md={10} sx={{ border: '1px solid #c5c5c5', p: 2 }}>
                    <Grid item xs={12} m={3}>
                        <Typography variant='h5' align='center'>Invoice Information</Typography>
                    </Grid>
                    <Grid item xs={10} sx={{ mx: 5 }}>
                        <DateSelector values={invoiceDetails} setValues={setInvoiceDetails} name='invoiceDate' label='Invoice Date' />
                    </Grid>
                    <Grid container item spacing={1} >
                        <Grid item xs={12} sm={6}>
                            <FormControl size='small' fullWidth sx={{ my: 1, p: 1 }}>
                                <TextField variant='standard' size='small' name='invoiceNumber' value={invoiceDetails.invoiceNumber} onChange={handleChange} label='Invoice Number' />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl size='small' fullWidth sx={{ my: 1, p: 1 }}>
                                <TextField variant='standard' size='small' name='contractReference' value={invoiceDetails.contractReference} onChange={handleChange} label='Contract Reference' />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl size='small' fullWidth sx={{ my: 1, p: 1 }}>
                                <TextField variant='standard' size='small' name='airplane' value={invoiceDetails.airplane} onChange={handleChange} label='Airplane' />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <AddressInput invoiceDetails={invoiceDetails} setInvoiceDetails={setInvoiceDetails} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl sx={{ ml: 3 }}>
                                <FormLabel>Attention to:</FormLabel>
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
                        <Grid item xs={12} textAlign='center'>
                            <Button variant='outlined' sx={{ width: '50%' }} onClick={handleCreateInvoice}>Create Invoice</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    } else {
        return null
    }
}
