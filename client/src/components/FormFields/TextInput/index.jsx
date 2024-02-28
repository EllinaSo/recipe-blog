import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

export const TextInput = ({ name, control, rules, onChange, ...props }) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field, fieldState: { error } }) => (
      <TextField
        {...field}
        {...props}
        onChange={(e) => {
          field.onChange(e);
          onChange?.(e);
        }}
        name={name}
        error={!!error}
        helperText={error && error.message}
      />
    )}
  />
);

export default TextInput;
