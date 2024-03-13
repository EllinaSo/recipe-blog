import { useState, useCallback } from 'react';
import { Controller } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();

export const Categories = ({ list = [], error, loading, name: fieldName, control, rules, helperText, ...props }) => {
  const [selected, setSelected] = useState([]);

  const getOptionLabel = useCallback((option) => {
    // Value selected with enter, right from the input
    if (typeof option === 'string') {
      return option;
    }
    // Add "xxx" option created dynamically
    if (option.label) {
      return option.name;
    }
    // Regular option
    return option.name;
  }, []);

  const filterOptions = useCallback((options, params) => {
    const filtered = filter(options, params);

    const { inputValue } = params;
    // Suggest the creation of a new value
    const isExisting = options.some((option) => inputValue === option.name);
    if (inputValue !== '' && !isExisting) {
      filtered.push({
        name: inputValue,
        label: `Add "${inputValue}"`,
        create: true,
      });
    }

    return filtered;
  }, []);

  return (
    <Controller
      name={fieldName}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error: fieldError } }) => (
        <Autocomplete
          freeSolo
          multiple
          clearOnBlur
          selectOnFocus
          handleHomeEndKeys
          options={list}
          value={selected}
          filterSelectedOptions
          filterOptions={filterOptions}
          getOptionLabel={getOptionLabel}
          renderOption={(props, option) => <li {...props}>{option.create ? option.label : option.name}</li>}
          renderInput={(params) => (
            <TextField
              {...props}
              {...params}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
              name={fieldName}
              error={!!(fieldError || error)}
              helperText={fieldError || error ? error || fieldError.message : helperText}
            />
          )}
          onChange={(event, newValue, reason, details) => {
            let newSelected;
            if (details?.option.create && reason !== 'removeOption') {
              newSelected = [
                ...selected,
                {
                  id: undefined,
                  name: details.option.name,
                  create: details.option.create,
                },
              ];
            } else {
              newSelected = newValue.map((value) => {
                if (typeof value === 'string') {
                  return {
                    id: undefined,
                    name: value,
                    create: true,
                  };
                } else {
                  return value;
                }
              });
            }
            setSelected(newSelected);
            field.onChange(newSelected);
          }}
        />
      )}
    />
  );
};

export default Categories;
