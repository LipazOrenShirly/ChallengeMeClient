import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
// import TagFacesIcon from '@material-ui/icons/TagFaces';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
    backgroundColor:'#E8D5D5',
    boxShadow:'none',
    marginBottom:'3%'
  },
  chip: {
    margin: theme.spacing(0.5),
    backgroundColor:'rgba(147, 141, 160, 0.801)',
    color:'whitesmoke',
  },
}));

export default function ChipsArray(props) {
  const classes = useStyles();
  // const [chipData, setChipData] = React.useState([
  //   { key: 0, label: 'Angular' },
  //   { key: 1, label: 'jQuery' },
  //   { key: 2, label: 'Polymer' },
  //   { key: 3, label: 'React' },
  //   { key: 4, label: 'Vue.js' },
  // ]);
  
  const handleDelete = (data, chipToDelete) => () => {
    var NewArr = props.TagsArray.filter((data,key) => key !== chipToDelete);
    props.SendNewArrToAddNewChallenge(NewArr);
  };

  return (
    <Paper className={classes.root}>
      {props.TagsArray.map((data,key) => {
        let icon;

        return (
          <Chip
            key={key}
            icon={icon}
            label={data}
            onDelete={handleDelete(data,key)}
            className={classes.chip}
          />
        );
      })}
    </Paper>
  );
}