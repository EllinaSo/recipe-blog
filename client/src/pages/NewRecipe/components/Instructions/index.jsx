import { useFieldArray } from 'react-hook-form';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

import { TextInput } from '../../../../components/FormFields';

const Instructions = ({ name, control, rules }) => {
  const { fields, remove, append } = useFieldArray({ control, name });

  return (
    <>
      <Typography mb={1} fontWeight="medium">
        Instructions:
      </Typography>
      <Grid container spacing={1}>
        {fields.map((ingredient, index) => (
          <Grid item xs={12} key={ingredient.id}>
            <TextInput
              multiline
              minRows={2}
              maxRows={6}
              control={control}
              name={`${name}.${index}.value`}
              label={`Step ${index + 1}`}
              rules={rules}
              InputProps={{
                endAdornment: index ? (
                  <InputAdornment position="end">
                    <IconButton aria-label="Remove step" onClick={() => remove(index)} edge="end">
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              }}
            />
          </Grid>
        ))}

        {fields.length < 20 && (
          <Grid item xs={12}>
            <Button type="button" onClick={() => append('')}>
              Add step
            </Button>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Instructions;
