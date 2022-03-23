import * as React from 'react';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';

import { fetchLocations } from "./redux/locationSlice";
import { updateSuggestedLocations, updateSelectedLocation } from './redux/locationSlice'

export default function LocationAutoComplete() {
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');

  const dispatch = useDispatch();

  const options = useSelector(state => state.location.SuggestedLocations)

  React.useEffect(() => {

    if (inputValue === '') {
    //   setOptions(value ? [value] : []);
      dispatch(updateSuggestedLocations(value ? [value] : []));
      return undefined;
    }

    dispatch(fetchLocations({input: inputValue}));

    return () => {
    };
  }, [value, inputValue]);

  return (
    <Autocomplete
      id="google-map-demo"
      sx={{ width: 300 }}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event, newValue) => {
        dispatch(updateSelectedLocation(newValue.description))
        // dispatch(updateSuggestedLocations(newValue ? [newValue, ...options] : options));
        // setOptions(newValue ? [newValue, ...options] : options);
        // setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Add a location" fullWidth />
      )}
      renderOption={(props, option) => {
        const matches = option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length]),
        );

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item>
                <Box
                  component={LocationOnIcon}
                  sx={{ color: 'text.secondary', mr: 2 }}
                />
              </Grid>
              <Grid item xs>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}

                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
