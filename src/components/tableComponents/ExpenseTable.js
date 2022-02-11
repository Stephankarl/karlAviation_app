import { useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import NumberFormat from 'react-number-format';

//IMPORT FUNCTIONS
import { getOneContract } from '../store/contracts';

//Material UI
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
  
export default function ExpenseTable({ contractId }) {
    const contract = useSelector(getOneContract(contractId))

    return (
        <TableContainer > 
            <Table >
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell align="right">Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {contract.expenses.map((expense) => (
                        <TableRow
                            key={expense._id}
                            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>
                                {moment(expense.submitDate).format('DD MMM')}
                            </TableCell>
                            <TableCell align="right"><NumberFormat value={expense.amount} displayType={'text'} thousandSeparator={true} prefix={'$'} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
