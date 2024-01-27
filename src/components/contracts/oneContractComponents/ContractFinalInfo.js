import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import NumberFormat from 'react-number-format'

//Import functions
import { getOneContract } from '../../store/contracts';

//Material UI
import { Grid, Typography } from '@mui/material';

export default function ContractFinalInfo() {

    const { id } = useParams()
    const contract = useSelector(getOneContract(id))

  return (
    <Grid container>
        <Grid item xs={12} m={3}>
            <Typography variant='h5'>Contract Info</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography align='center'>Created Date</Typography>
            <Typography align='center'>Start Date</Typography>
            <Typography align='center'>End Date</Typography>
            <Typography align='center'>Total Days</Typography>
            <Typography align='center'>Retainer</Typography>
            <Typography align='center'>Rate</Typography>
            <Typography align='center'>Total Income</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography align='center'>{moment(contract.createdDate).format('DD MMM YYYY')}</Typography>
            <Typography align='center'>{moment(contract.startDate).format('DD MMM YYYY')}</Typography>
            <Typography align='center'>{moment(contract.endDate).format('DD MMM YYYY')}</Typography>
            <Typography align='center'>{contract.totalDays}</Typography>
            <Typography align='center'>{ contract.retainer ? 'YES' : 'NO' }</Typography>
            <Typography align='center'><NumberFormat value={contract.rate} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Typography>
            <Typography align='center'><NumberFormat value={contract.totalIncome} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Typography>
        </Grid>

        <Grid item xs={12} m={3}>
            <Typography variant='h5'>Expenses</Typography>
        </Grid>
        <Grid item xs={6}>
            { contract.expenses.map(expense => (
                <Typography key={expense._id} align='center'>Submit Date: {moment(expense.submitDate).format('DD MMM')}</Typography>
            ))}
        </Grid>
        <Grid item xs={6}>
            { contract.expenses.map(expense => (
                <Typography key={expense._id} align='center'><NumberFormat value={expense.amount} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Typography>
            ))}
        </Grid>
        <Grid item xs={12} m={3}>
            <Typography variant='h5'>Invoice</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography align='center'>Invoice Date</Typography>
            <Typography align='center'>Invoice Number</Typography>
            <Typography align='center'>Invoice Contact Person</Typography>
            <Typography align='center'>Invoice Reference</Typography>
            <Typography align='center'>Invoice Total</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography align='center'>{moment(contract.invoice.invoiceDate).format('DD MMM YYYY')}</Typography>
            <Typography align='center'>{contract.invoice.invoiceNumber}</Typography>
            <Typography align='center'>{contract.invoice.contactPerson}</Typography>
            <Typography align='center'>{contract.invoice.invoiceReference ? `${contract.invoice.invoiceReference}` : 'NONE' }</Typography>
            <Typography align='center'><NumberFormat value={contract.invoice.invoiceTotal} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Typography>
        </Grid>
        <Grid item xs={12} m={3}>
            <Typography variant='h5'>Payments</Typography>
        </Grid>
        <Grid item xs={6}>
            { contract.payment.paid.map(p => (
                <Typography key={p._id} align='center'>Paid Date: {moment(p.payDate).format('DD MMM YYYY')}</Typography>
            ))}
            <Typography align='center'>Payment Type</Typography>
            <Typography align='center'>Tax Withholding</Typography>
            <Typography align='center'>Contract Fully Paid</Typography>
            <Typography align='center'>What is Owed</Typography>
        </Grid>
        <Grid item xs={6}>
            { contract.payment.paid.map(p => (
                <Typography key={p._id} align='center'><NumberFormat value={p.amount} displayType='text' thousandSeparator={true} prefix={'$'} /></Typography>
            ))}
            <Typography align='center'>{contract.payment.paymentType === '1099' ? '1099' : 'W-2'}</Typography>
            <Typography align='center'><NumberFormat value={contract.payment.taxWithholding} displayType='text' thousandSeparator={true} prefix={'$'} /></Typography>
            <Typography align='center' style={ (!contract.payment.paymentComplete) ? { color: 'red' } : { color: '#3cc194' }}>{ contract.payment.paymentComplete ? 'YES' : 'NO' }</Typography>
            <Typography align='center' style={ (!contract.payment.paymentComplete) ? { color: 'red' } : { color: '#3cc194' }}><NumberFormat value={contract.payment.owed} displayType='text' thousandSeparator={true} prefix={'$'} /></Typography>
        </Grid>
    </Grid>
 )
}
