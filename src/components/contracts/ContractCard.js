import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import NumberFormat from 'react-number-format';

//IMPORT FILES
import AgentSelector from '../formComponents/AgentSelector'

//IMPORT FUNCTION
import { closeContract, getOneContract, deleteContract } from '../store/contracts';
import { getOneAgent } from '../store/agents';

// MATERIAL UI
import { Grid, Card, CardHeader, CardContent, Typography, IconButton, Button } from '@mui/material'

//MATERIAL UI ICONS
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckIcon from '@mui/icons-material/Check';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PaidIcon from '@mui/icons-material/Paid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function ContractCard({ id }) {
    const dispatch = useDispatch()
    const contract = useSelector(getOneContract(id))
    const agent = useSelector(getOneAgent(contract.agent))

    const handleClose = () => {
        dispatch(closeContract(contract._id))
    }

    return (
        <Grid item xs={12} sm={6} md={4} lg={3} >
            <Card sx={{
                minWidth: '250px'
            }}>
                <CardHeader 
                    title={contract.agent ? agent.companyName : <AgentSelector contractId={contract._id} />}
                    subheader={`${moment(contract.startDate).format('DD MMM')} - ${moment(contract.endDate).format('DD MMM')} (${contract.totalDays})`}
                    action={
                        <Link to={`/contracts/${id}`}>
                            <IconButton>
                                <MoreVertIcon />
                            </IconButton>
                        </Link>
                    }
                />
                <CardContent>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography>Rate:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography align='right'><NumberFormat value={contract.rate} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>Total Income:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography align='right'><NumberFormat value={contract.totalIncome} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Typography>
                        </Grid>
                        { contract.payment.paid.length > 0 && contract.payment.owed !== 0 &&
                            <Fragment>
                                <Grid item xs={6}>
                                    <Typography>Total Owed:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography align='right' color='error'><NumberFormat value={contract.payment.owed} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Typography>
                                </Grid>
                            </Fragment>
                        }

                        <Grid container item justifyContent='space-around' style={{ display: 'flex', alignItems: 'center', marginTop: 15, paddingTop: 15, borderTop: '1px solid grey' }} >
                            <CheckIcon style={ (!contract.complete.completed) ? { color: '#373543' } : { color: '#3cc194' }} />
                            <ReceiptIcon style={ (!contract.invoice.invoiced) ? { color: '#373543' } : { color: '#3cc194' }} />
                            <PaidIcon style={ (!contract.payment.paymentComplete) ? { color: '#373543' } : { color: '#3cc194' }} />
                            { contract.open && 
                                <IconButton onClick={() => dispatch(deleteContract(contract._id))}>
                                    <DeleteForeverIcon color='error' />
                                </IconButton>
                            }
                        </Grid>

                        {contract.payment.paymentComplete && contract.open &&
                            <Grid item xs={12}>
                                <Button variant='contained' color='inherit' size='small' fullWidth sx={{ color: '#3cc194', mt: 3 }} onClick={handleClose}>CLOSE CONTRACT</Button>
                            </Grid>
                        }
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    )
}
