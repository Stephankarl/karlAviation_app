import { useState } from 'react'
import { Grid, Input } from '@mui/material'

export default function AddressInput({ invoiceDetails, setInvoiceDetails }) {
    const [focused, setFocused] = useState(false);

    const onFocus = () => {
        setFocused(true);
      };
      const onBlur = () => {
        setFocused(false);
      };

      const onChange = e => {
        setInvoiceDetails({
            ...invoiceDetails,
            invoiceAddress: {
                ...invoiceDetails.invoiceAddress,
                [e.target.name]: e.target.value
            }
        })
      }

    return (
        <Grid container justifyContent='center'>
            <Input
            margin="dense"
            placeholder="Address"
            value={invoiceDetails.invoiceAddress.street}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onChange}
            name='street'
            />
            <Input
            margin="dense"
            placeholder="City"
            value={invoiceDetails.invoiceAddress.city}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onChange}
            name='city'
            />
            <Input
            margin="dense"
            placeholder="State"
            value={invoiceDetails.invoiceAddress.state}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onChange}
            name='state'
            />
            <Input
            margin="dense"
            placeholder="Zip code"
            value={invoiceDetails.invoiceAddress.zip}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onChange}
            name='zip'
            />
        </Grid>
    )
}
