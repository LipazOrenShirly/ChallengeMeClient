/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function FreeSoloTransfer(props) {
  return (
    <div className="DivAutoComplete">

      <Autocomplete
        freeSolo
        className="form-control inputRounded" 
        id="NewChallengeName"
        disableClearable
        onInputChange={props.onInputChange}
        options={props.challenges.map((option) => option.challengeName)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="שם האתגר"
            margin="none"
            variant="standard"
            InputProps={{ ...params.InputProps, type: 'search' }}
          />
        )}
      />
    </div>
  );
}
