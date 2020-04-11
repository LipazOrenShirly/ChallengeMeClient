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
        id="tags-filled"
        options={props.tags.map((option) => option.tagName)}
        
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => 
          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          )
            //  {props.Send(index);}
          
        }
        renderInput={(params) => (
          <TextField {...params} variant="filled" label="הכנס תגיות מתאימות" placeholder="בחר תגיות" />
        )}
      />
    </div>
  );
}


const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
];      