import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import React from 'react';

const filter = createFilterOptions();

const CreateableSelection = ({
  className,
  options,
  labelKey,
  value,
  setData,
  renderInput,
  size,
  fullWidth
}) => {
  return (
    <Autocomplete
      className={className}
      options={options}
      filterOptions={(opts, params) => {
        const filtered = filter(opts, params);
        // Suggest the creation of a new value
        if (params.inputValue !== '' && !opts.find(x => x[labelKey] === params.inputValue)) {
          filtered.push({
            inputValue: params.inputValue,
            [labelKey]: `Add "${params.inputValue}"`,
          });
        }
        return filtered;
      }}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option[labelKey];
      }}
      renderOption={(option) => option[labelKey]}
      value={value}
      onChange={(_e, newValue)=>{
        if (typeof newValue === 'string') {
          setData({
            nama: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setData({
            nama: newValue.inputValue,
          });
        } else {
          setData(newValue);
        }
      }}
      freeSolo
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      size={size}
      fullWidth={fullWidth}
      renderInput={renderInput}
    />
  )
}

export default React.memo(CreateableSelection);