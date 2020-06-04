/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function FreeSoloTeacher(props) {
  return (
    

      <Autocomplete
        freeSolo
        className="form-control inputRounded" 
        id="NewChallengeName"
        disableClearable
        onInputChange={props.onInputChange}
        options={props.teachersArr.map((option) => option.firstName + " "+ option.lastName)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={props.lableFreeSolo}
            
            InputProps={{ ...params.InputProps, type: 'search' }}
          />
        )}
      />
    
  );
}
