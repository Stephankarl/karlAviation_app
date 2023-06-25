// import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { saveAs } from 'file-saver'

//Import Functions
import { closeContract, completeContract, getOneContract } from '../../store/contracts'

//Import constants
import { baseURL, contractsUrl } from '../../store/config/api'

import { Grid, Button, Typography } from '@mui/material'

export default function ContractControls() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const contract = useSelector(getOneContract(id))

    const handleDownload = () => {
        axios.get(`${baseURL}${contractsUrl}/${contract._id}/invoice`, { responseType: 'blob'})
        .then(res => {
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' })
            saveAs(pdfBlob, `${contract.invoice.invoiceNumber}.pdf`)
        })
    }

    return (
        <Grid container justifyContent='center'>
            <Grid item xs={12} md={10} textAlign='center' sx={{ border: '1px solid #c5c5c5', py: 2, mt: 2 }}>
                <Typography variant='h5' mb={2} align='center'>Contract Control</Typography>
                { !contract.complete.completed && 
                    <Button variant='contained' fullWidth sx={{ mb: 2 }} onClick={() => dispatch(completeContract(contract._id))}>
                        {`Contract Completed ($${contract.totalIncome})`}
                    </Button>
                }
                
                { contract.invoice.invoiceCreated && 
                    <Button variant='contained' fullWidth sx={{ mb: 2 }} onClick={() => { handleDownload() }}>
                        Download Invoice
                    </Button>
                }

                { contract.payment.paymentComplete && 
                    <Button variant='contained' fullWidth sx={{ mb: 2 }} onClick={() => { dispatch(closeContract(contract._id)) }}>
                        Close Contract
                    </Button>
                }
            </Grid>
        </Grid>
    )
}
