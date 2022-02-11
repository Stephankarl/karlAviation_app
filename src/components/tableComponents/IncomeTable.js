import { useSelector } from 'react-redux'
import moment from 'moment'
import NumberFormat from 'react-number-format';

//IMPORT FUNCTIONS
import { getOneContract } from '../store/contracts';

//Material UI
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography} from '@mui/material';
  
export default function IncomeTable({ contractId }) {
    const contract = useSelector(getOneContract(contractId))

    return (
        <TableContainer >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Rate</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell align="right">Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>{moment(contract.startDate).format('DD MMM')} - {moment(contract.endDate).format('DD MMM')}</TableCell>
                        <TableCell><NumberFormat value={contract.rate} displayType={'text'} thousandSeparator={true} prefix={'$'} /></TableCell>
                        <TableCell align="center">{contract.totalDays}</TableCell>
                        <TableCell align="right"><NumberFormat value={contract.totalIncome} displayType={'text'} thousandSeparator={true} prefix={'$'} /></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}
