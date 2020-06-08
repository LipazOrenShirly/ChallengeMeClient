import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function FreeSoloGroupedInst(props) {

    return (
        <Autocomplete
            className="form-control inputNewTeacher"
            id={props.id} 
            value={props.value}                   
            onChange={props.onChange}
            options={props.options}
            getOptionLabel={option => option.institutionName}
            groupBy={(option) => option.institutionName[0]}
            renderInput = {(params) => (
                <TextField 
                    {...params} 
                    label={props.label} 
                    dir="rtl"
                    />
            )}
        />
    );
}