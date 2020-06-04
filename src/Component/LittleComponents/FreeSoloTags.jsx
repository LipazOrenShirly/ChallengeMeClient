import React from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));

export default function FreeSoloTags(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        className="form-control inputRounded inputHeight" 
        id="tags-filled"
        onChange={props.onTagsChange}
        options={props.tags}
        getOptionLabel={option => option.tagName}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => 
            <Chip variant="outlined" label={option.tagName} {...getTagProps({ index })} />
          )
        }
        renderInput={(params) => (
          <TextField 
            {...params}  
            variant="filled" 
            label="בחר תגיות מתאימות" />
        )}
      />
    </div>
  );
}

  