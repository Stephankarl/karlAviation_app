import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { saveAs } from 'file-saver'

//Import constants
import { baseURL, contractsUrl } from '../../store/config/api'

//Import function
import { getOneContract, completeContract, closeContract } from '../../store/contracts';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function ContractStepper({ activeStep, handleBack, handleForward }) {
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

  const handleClose = () => {
    dispatch(closeContract(contract._id))
}

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step>
          <StepLabel>Complete Contract</StepLabel>
          <StepContent>
            <Typography>Update your contract dates and rates.  Also add your total expenses here.</Typography>
            <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => {
                      dispatch(completeContract(contract._id))
                      handleForward()
                    }}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Complete
                  </Button>
                </div>
              </Box>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Create an Invoice</StepLabel>
          <StepContent>
            <Typography>You can add any info for the invoice here. Contract reference if they gave you one and also add an address.</Typography>
            <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant='contained'
                    disabled={!contract.invoice.invoiced}
                    onClick={handleForward}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Next Step
                  </Button>
                  <Button
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Download Invoice and Payment</StepLabel>
          <StepContent>
            <Typography>Did you get Paid?  Great, select the data and confirm the amount. Also was this a 1099 payment or a W2? A W2 payment will automatically calculate the Tax Withholing and store that.</Typography>
            <Box sx={{ mb: 2 }}>
                <div>
                  <Button 
                    variant='contained' 
                    onClick={() => {
                      handleDownload()
                    }} 
                    sx={{ mt: 1, mr: 1 }}
                  >
                  Download Invoice
                  </Button>
                  <Button
                    onClick={handleForward}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Next
                  </Button>
                  <Button
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Finalize Contract</StepLabel>
          <StepContent>
            <Typography>Make sure all the info is correct and close the contract. </Typography>
            <Box sx={{ mb: 2 }}>
                <div>
                  <Button 
                    variant='contained'
                    disabled={!contract.payment.paymentComplete}
                    onClick={() => {
                      handleClose()
                      handleForward()
                    }} 
                    sx={{ mt: 1, mr: 1 }}
                  >
                  Close Contract
                  </Button>
                  <Button
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
          </StepContent>
        </Step>
      </Stepper>
      {activeStep === 4 && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All Steps are complete, this Contract is closed.</Typography>
          <Button
            variant='contained'
            onClick={handleDownload}
            sx={{ mt: 1, mr: 1 }}
          >
            Download Invoice
          </Button>
        </Paper>
      )}
    </Box>
  );
}
