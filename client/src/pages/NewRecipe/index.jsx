import { useForm } from 'react-hook-form';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { TextInput } from '../../components/FormFields';
import Ingredients from './components/Ingredients';

const NewRecipe = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
      email: '',
      ingredients: [{ value: '' }],
    },
    mode: 'onChange',
  });

  const handleOnSubmit = () => {};

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
      <Paper sx={{ p: { xs: 4, sm: 6 } }}>
        <Typography fontWeight="medium" sx={{ typography: { xs: 'h6', md: 'h4' } }} mb={2}>
          Create a new recipe
        </Typography>

        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <Grid container spacing={2}>
            {/* <Grid item xs={12}>
              TBD Image/Photo (for uploading a picture of the dish)
            </Grid> */}
            <Grid item xs={12}>
              <TextInput
                name="title"
                label="Title"
                placeholder="Recipe Name"
                control={control}
                rules={{ required: 'Title is required' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextInput
                name="description"
                label="Description"
                placeholder="Recipe description"
                control={control}
                rules={{ required: 'Description is required' }}
                multiline
                rows={2}
              />
            </Grid>
            {/* <Grid item xs={12}>
             TBD Category ( Cuisine Type, Dietary Restrictions)
            </Grid> */}
            <Grid item xs={12}>
              <Typography mb={1} fontWeight="medium">
                Preparation time:
              </Typography>

              <Grid container spacing={1}>
                <Grid item xs={12} sm={4}>
                  <TextInput
                    name="prepTime"
                    label="Preparation"
                    placeholder="Preparation time"
                    control={control}
                    rules={{ required: 'Prep time is required' }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextInput
                    name="cookTime"
                    label="Cooking"
                    placeholder="Cooking time"
                    control={control}
                    rules={{ required: 'Cooking time is required' }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextInput
                    name="totalTime"
                    label="Total"
                    placeholder="Total time"
                    control={control}
                    rules={{ required: 'Total time is required' }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Ingredients control={control} name="ingredients" rules={{ required: 'Ingredients can not be empty' }} />
            </Grid>
            {/* <Grid item xs={12}>
             Instructions
            </Grid> */}
            <Grid item xs={12}>
              <TextInput name="note" label="Note" placeholder="Recipe note" control={control} multiline rows={2} />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ pt: 3 }}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                // disabled={loading}
                // endIcon={loading ? <CircularProgress color="inherit" size={14} /> : null}
              >
                Create
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                fullWidth
                type="button"
                // disabled={loading}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default NewRecipe;
