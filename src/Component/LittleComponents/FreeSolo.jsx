/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function FreeSolo(props) {
  return (
    <div className="DivAutoComplete">

      <Autocomplete
        freeSolo
        className="form-control inputRounded" 
        id={props.id}
        disableClearable
        onInputChange={props.onInputChange}
        options={props.options}
        renderInput={(params) => (
          <TextField
            {...params}
            label={props.label}
            margin="none"
            variant="standard"
            InputProps={{ ...params.InputProps, type: 'search' }}
            dir="rtl"
          />
        )}
      />
    </div>
  );
}
