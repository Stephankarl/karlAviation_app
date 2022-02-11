import { useSelector } from 'react-redux'
import moment from 'moment'
import NumberFormat from 'react-number-format';

//IMPORT FUNCTIONS
import { getOneContract } from '../store/contracts';

//Material UI
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography} from '@mui/material';
  
export default function TotalTable({ contractId }) {
    const contract = useSelector(getOneContract(contractId))

    return (
        <TableContainer>
            <Table >
                <TableHead>
                    <TableRow>
                        <TableCell>Total</TableCell>
                        <TableCell align='right'><NumberFormat value={contract.invoice.invoiceTotal} displayType={'text'} thousandSeparator={true} prefix={'$'} /></TableCell>
                    </TableRow>
                </TableHead>
            </Table>
        </TableContainer>
    )
}
