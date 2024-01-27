import { Fragment } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//Import Functions
import { addAgent } from '../store/agents';

//Material UI
import { TextField } from 'formik-material-ui';
import { Box, FormControl, Grid, Button, Typography, Stack } from '@mui/material';

export default function NewAgent() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userId = useSelector(state => state.entities.user.currentUser._id)

    const initialValues = {
        userId: userId,
        companyName: '',
        nickName: '',
        contacts: [
            {
                name:'',
                email: '',
                cellPhoneNumber: ''
            }
        ]
     }

    const onSubmit = (values, { setSubmitting }) => {
        setSubmitting(false)
        dispatch(addAgent(values))
        navigate('/')
    }

    return (
        <Grid container>
            <Grid item xs={12} mb={3}>
                <Typography variant='h4' align='center' >New Agent</Typography>
            </Grid>
            <Grid item xs={12}>
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    {formik => {
                        return(
                            <Form>
                                <Grid container item xs={12} sm={8} md={4} style={{ display: 'flex', justifyContent: 'center'}}>
                                    <FormControl fullWidth sx={{ m: 1 }}>
                                        <Field component={TextField} name='companyName' label='Company Name' type='text' required />
                                    </FormControl>
                                    <FormControl fullWidth sx={{ m: 1 }}>
                                        <Field component={TextField} name='nickName' label='Nickname' type='text'  />
                                    </FormControl>
                                </Grid>
                                
                                <Grid item container spacing={3}>
                                    <FieldArray name='contacts'>
                                    { props => {
                                        const { push, remove, form } = props
                                        const { values } = form 
                                        const { contacts } = values

                                        return (
                                            <Fragment>
                                                {contacts.map((contact, i) => (
                                                    <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                                                        <Typography variant='h6' >Contact</Typography>
                                                        <Stack spacing={2} >
                                                            <Field component={TextField} name={`contacts[${i}].name`} placeholder='Contact Name' type='text' required />
                                                            <Field component={TextField} name={`contacts[${i}].email`} placeholder='Contact Email' type='text' />
                                                            <Field component={TextField} name={`contacts[${i}].cellPhoneNumber`} placeholder='Contact Cell Number' type='number' />
                                                        </Stack>
                                                        <Box sx={{ m: 2 }}>
                                                            <Button variant='outlined' sx={{ width: '40%', m: 1 }} type='button' onClick={() => push({
                                                                name:'',
                                                                email: '',
                                                                cellPhoneNumber: ''
                                                            })}>+</Button>
                                                            { i > 0 && <Button variant='outlined' color='error' sx={{ width: '40%', m: 1 }} type='button' onClick={() => remove(i)} >-</Button>}  
                                                        </Box>
                                                    </Grid>
                                                ))}
                                            </Fragment>
                                        )
                                    }}
                                    </FieldArray>
                                </Grid>
                                <Grid item mt={2}>
                                    <Grid item xs={12}>
                                        <Button type='submit' variant='contained' fullWidth>Save</Button>
                                    </Grid>
                                </Grid>
                            </Form>
                        )
                    }}
                </Formik>

            </Grid>
            
            
        </Grid>
    )
}
