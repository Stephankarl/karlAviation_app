import { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { getOneAgent } from '../store/agents';

//IMPORT FUNCTIONS
import { updateAgent } from '../store/agents'

//MATERIAL UI
import { Grid, Typography, Button, Stack } from '@mui/material'
import { TextField } from 'formik-material-ui'

//Formik
import { Formik, Form, Field, FieldArray } from 'formik'

export default function OneAgent() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const agent = useSelector(getOneAgent(id))

    const initialValues = { 
        companyName: agent.companyName,
        nickName: agent.nickName,
        contacts: agent.contacts
     }

    const onSubmit = values => {
        dispatch(updateAgent(id, values))
        navigate('/agents/all')
    }
    
    return (
        <Grid container>
            <Grid item xs={12} mb={3}>
                <Typography variant='h4' align='center' >Agent</Typography>
            </Grid>
            <Grid item xs={12}>
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    {formik => {
                        return(
                            <Form>
                                <Grid item xs={12} sm={6} mb={3}>
                                    <Stack spacing={2}>
                                        <Field component={TextField} name='companyName' label='Company Name' type='text' margin='normal' required />
                                        <Field component={TextField} name='nickName' label='Nickname' type='text' margin='normal' />
                                    </Stack>
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
                                                            <Stack spacing={3} >
                                                                <Field component={TextField} name={`contacts[${i}].name`} placeholder='Contact Name' type='text' required />
                                                                <Field component={TextField} name={`contacts[${i}].email`} placeholder='Contact Email' type='text' />
                                                                <Field component={TextField} name={`contacts[${i}].cellPhoneNumber`} placeholder='Contact Cell Number' type='number' />
                                                            </Stack>
                                                            <button type='button' onClick={() => push({
                                                               name:'',
                                                               email: '',
                                                               cellPhoneNumber: ''
                                                            })}>+</button>
                                                            { i > 0 && <button type='button' onClick={() => remove(i)} >-</button>}
                                                        </Grid>
                                                    ))}
                                                </Fragment>
                                            )
                                        }}
                                    </FieldArray>
                                </Grid>
                                <Grid item mt={2}>
                                    <Grid item xs={12}>
                                        <Button type='submit' variant='outlined' fullWidth>Save</Button>
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
