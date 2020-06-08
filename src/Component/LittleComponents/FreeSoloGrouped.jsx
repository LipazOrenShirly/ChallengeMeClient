import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function FreeSoloGrouped(props) {

    return (
        <Autocomplete
            key={props.clear}
            className="form-control inputRounded"
            id={props.id}
            onChange={props.onInputChange}
            options={props.options}
            getOptionLabel={option => option.firstName + " " + option.lastName}
            groupBy={(option) => option.className}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={props.label}
                    dir="rtl"
                />
            )}
        />
    );
}