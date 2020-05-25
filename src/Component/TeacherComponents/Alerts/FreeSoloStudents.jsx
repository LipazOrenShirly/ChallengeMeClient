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
        id="NewChallengeName"
        disableClearable
        onInputChange={props.onInputChange}
        options={props.students.map((option) => option.firstName+' '+ option.lastName)}
        renderInput={(params) => (
          <TextField
            {...params}
            // className="form-control inputRounded" 
            label="חפש לפי תלמיד"
            margin="none"
            variant="standard"
            InputProps={{ ...params.InputProps, type: 'search' }}
          />
        )}
      />
    </div>
  );
}
