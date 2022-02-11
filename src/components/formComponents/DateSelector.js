
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterMoment';
import DatePicker from '@mui/lab/DesktopDatePicker';

import { TextField, FormControl } from '@mui/material'

export default function DateSelector({ values, setValues, name, label }) {

    const handleChange = date => {
        setValues({
            ...values,
            [name]: date._d
        })
    }

    return (
        <FormControl fullWidth >
            <LocalizationProvider dateAdapter={DateAdapter}>
                <DatePicker
                    label={label}
                    name={name}
                    inputFormat="DD/MM/yyyy"
                    value={values[name]}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </FormControl>
    )
}
