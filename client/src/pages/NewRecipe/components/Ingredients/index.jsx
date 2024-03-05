import { useFieldArray } from 'react-hook-form';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

import { TextInput } from '../../../../components/FormFields';

const Ingredients = ({ name, control, rules }) => {
  const { fields, remove, append } = useFieldArray({ control, name });

  return (
    <>
      <Typography mb={1} fontWeight="medium">
        Ingredients:
      </Typography>
      <Grid container spacing={1}>
        {fields.map((ingredient, index) => (
          <Grid item xs={12} md={6} key={ingredient.id}>
            <TextInput
              control={control}
              name={`${name}.${index}.value`}
              label={`Ingredient ${index + 1}`}
              rules={rules}
              InputProps={{
                endAdornment: index ? (
                  <InputAdornment position="end">
                    <IconButton aria-label="Remove ingredient" onClick={() => remove(index)} edge="end">
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
              Add ingredient
            </Button>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Ingredients;
