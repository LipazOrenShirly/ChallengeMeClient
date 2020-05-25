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

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
// const top100Films = [
//   { title: 'The Shawshank Redemption', year: 1994 },
//   { title: 'The Godfather', year: 1972 },
//   { title: 'The Godfather: Part II', year: 1974 },
//   { title: 'The Dark Knight', year: 2008 },
//   { title: '12 Angry Men', year: 1957 },
//   { title: 'A Clockwork Orange', year: 1971 },
//   { title: 'Like Stars on Earth', year: 2007 },
//   { title: 'Taxi Driver', year: 1976 },
//   { title: 'Lawrence of Arabia', year: 1962 },
//   { title: 'Double Indemnity', year: 1944 },
//   { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
//   { title: 'Amadeus', year: 1984 },
//   { title: 'To Kill a Mockingbird', year: 1962 },
//   { title: 'Toy Story 3', year: 2010 },
//   { title: 'Logan', year: 2017 },
//   { title: 'Full Metal Jacket', year: 1987 },
//   { title: 'Dangal', year: 2016 },
//   { title: 'The Sting', year: 1973 },
//   { title: '2001: A Space Odyssey', year: 1968 },
//   { title: "Singin' in the Rain", year: 1952 },
//   { title: 'Toy Story', year: 1995 },
//   { title: 'Bicycle Thieves', year: 1948 },
//   { title: 'The Kid', year: 1921 },
//   { title: 'Inglourious Basterds', year: 2009 },
//   { title: 'Snatch', year: 2000 },
//   { title: '3 Idiots', year: 2009 },
//   { title: 'Monty Python and the Holy Grail', year: 1975 },
// ];
