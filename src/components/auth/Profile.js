import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

//Import Functions
import { updateUser } from '../store/users'

//Material UI
import { FormControl, Grid, TextField, Typography, Button } from '@mui/material'

export default function Profile() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.entities.user.currentUser)
    const [formData, setFormData] = useState(
        {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            companyName: user.companyName || '',
            bankDetails: {
                accountName: user.bankDetails.accountName || '',
                accountNumber: user.bankDetails.accountNumber || '',
                routingNumber: user.bankDetails.routingNumber || '',
                accountType: user.bankDetails.accountType || ''
            },
            address: {
                street: user.address.street || '',
                cityState: user.address.cityState || '',
                zip: user.address.zip || ''
            },
            phoneNumber: {
                countryCode: user.phoneNumber.countryCode || '',
                number: user.phoneNumber.number || ''
            },
            target: user.target
        }
    )

    const handleChange = ({ target: { name, value }}) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleBankDetails = ({ target: { name, value }}) => {
        setFormData( prevState => ({
            ...prevState,
            bankDetails: {
                ...prevState.bankDetails,
                [name]: value
            }
        }))
    }

    const handleAddress = ({ target: { name, value }}) => {
        setFormData( prevState => ({
            ...prevState,
            address: {
                ...prevState.address,
                [name]: value
            }
        }))
    }
    const handlePhoneNumber = ({ target: { name, value }}) => {
        setFormData( prevState => ({
            ...prevState,
            phoneNumber: {
                ...prevState.phoneNumber,
                [name]: value
            }
        }))
    }

    const handleUpdate = () => {
        dispatch(updateUser(formData));
    }

    return (
        <Grid container>

            <Grid item xs={12} mb={3}><Typography variant='h5' align='center'>Profile Details</Typography></Grid>
            <Grid item xs={12} sm={8} md={6}>
                <FormControl fullWidth sx={{ p: 1 }}>
                    <TextField name='firstName' label='First Name' value={formData.firstName} onChange={handleChange}  />
                </FormControl>
                <FormControl fullWidth sx={{ p: 1 }}>
                    <TextField name='lastName' label='Last Name' value={formData.lastName} onChange={handleChange}  />
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={8} md={6}>
                <FormControl fullWidth sx={{ p: 1 }}>
                    <TextField name='companyName' label='Company Name' value={formData.companyName} onChange={handleChange}  />
                </FormControl>
                <FormControl fullWidth sx={{ p: 1 }}>
                    <TextField name='email' label='Email' type='email' value={formData.email} onChange={handleChange} disabled />
                </FormControl>
            </Grid>

            <Grid item xs={12} my={3}><Typography variant='h5' align='center'>Bank Details</Typography></Grid>
            <Grid item xs={12} sm={8} md={6}>
                <FormControl fullWidth sx={{ p: 1 }}>
                    <TextField name='accountName' label='Account Name' value={formData.bankDetails.accountName} onChange={handleBankDetails}  />
                </FormControl>
                <FormControl fullWidth sx={{ p: 1 }}>
                    <TextField name='accountNumber' label='Account Number' value={formData.bankDetails.accountNumber} onChange={handleBankDetails}  />
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={8} md={6}>
                <FormControl fullWidth sx={{ p: 1 }}>
                    <TextField name='routingNumber' label='Routing Number' value={formData.bankDetails.routingNumber} onChange={handleBankDetails}  />
                </FormControl>
                <FormControl fullWidth sx={{ p: 1 }}>
                    <TextField name='accountType' label='Account Type' value={formData.bankDetails.accountType} onChange={handleBankDetails}  />
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={8} md={6}>
                <Typography variant='h5' align='center' my={3}>Address</Typography>
                <FormControl fullWidth sx={{ p: 1 }}>
                    <TextField name='street' label='Street Address' value={formData.address.street} onChange={handleAddress}  />
                </FormControl>
                <FormControl fullWidth sx={{ p: 1 }}>
                    <TextField name='cityState' label='City and State' value={formData.address.cityState} onChange={handleAddress}  />
                </FormControl>
                <FormControl fullWidth sx={{ p: 1 }}>
                    <TextField name='zip' label='Zip Code' value={formData.address.zip} onChange={handleAddress}  />
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={8} md={6}>
                <Typography variant='h5' align='center' my={3}>Phone Number</Typography>
                <FormControl fullWidth sx={{ p: 1 }}>
                    <TextField name='countryCode' label='Country Code' value={formData.phoneNumber.countryCode} onChange={handlePhoneNumber}  />
                </FormControl>
                <FormControl fullWidth sx={{ p: 1 }}>
                    <TextField name='number' label='Phone Number' value={formData.phoneNumber.number} onChange={handlePhoneNumber}  />
                </FormControl>
            </Grid>
            <Button fullWidth variant='contained' sx={{ my: 3}} onClick={handleUpdate}>Update</Button>
        </Grid>
    )
}


