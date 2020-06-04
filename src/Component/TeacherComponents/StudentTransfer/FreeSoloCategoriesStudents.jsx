import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function FreeSoloCategoriesStudents(props) {

    return (
        <Autocomplete
            // id="grouped-demo"
            className="form-control inputRounded"
            options={props.studentsArr.map((option) => option.firstName + " " + option.lastName)}
            // groupBy={(options) => options.classID)}
            // getOptionLabel={(options).map((option) => option.classID)}
            
            renderInput={(params) => <TextField {...params} label={props.lableFreeSolo} />}
        />
    );
}
{/* <Autocomplete
      id="grouped-demo"
      options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
      groupBy={(option) => option.firstLetter}
      getOptionLabel={(option) => option.title}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="With categories" variant="outlined" />}
    /> */}