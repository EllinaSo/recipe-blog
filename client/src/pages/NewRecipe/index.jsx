import { useEffect } from 'react';
import useAxios from 'axios-hooks';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { handleAxiosError } from '../../utils/error';
import { handleSuccess } from '../../utils/success';
import { TextInput } from '../../components/FormFields';

import Ingredients from './components/Ingredients';
import Categories from './components/Categories';
import Instructions from './components/Instructions';
import Preview from './components/Preview';

const NewRecipe = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { isSubmitted },
  } = useForm({
    defaultValues: { ingredients: [{ value: '' }], instructions: [{ value: '' }], preview: '' },
    mode: 'onChange',
  });

  const [{ loading: categoriesLoading, data: categories, error: categoriesError }, getCategories] = useAxios({
    url: 'api/categories',
    method: 'GET',
  });

  useEffect(() => {
    getCategories();
  }, []);

  const [{ loading }, createRecipe] = useAxios({
    url: 'api/recipe/create',
    method: 'POST',
  });

  const handleOnSubmit = ({ ingredients, instructions, categories, ...data }) => {
    const { existingList, newList } = categories.reduce(
      ({ existingList, newList }, category) => {
        if (category.create) {
          newList.push(category.name);
        } else {
          existingList.push(category._id);
        }
        return { existingList, newList };
      },
      { existingList: [], newList: [] }
    );

    createRecipe({
      data: {
        ...data,
        ingredients: ingredients.map(({ value }) => value),
        instructions: instructions.map(({ value }) => value),
        categories: existingList,
        newCategories: newList,
      },
    })
      .then(() => {
        handleSuccess('New recipe successfully created');
        navigate('/');
      })
      .catch(handleAxiosError);
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
      <Paper sx={{ p: { xs: 4, sm: 6 } }}>
        <Typography fontWeight="medium" sx={{ typography: { xs: 'h6', md: 'h4' } }} mb={2}>
          Create a new recipe
        </Typography>

        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Preview
                control={control}
                name="preview"
                rules={{ required: 'Dish photo is required' }}
                isSubmitted={isSubmitted}
              />
            </Grid>
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
            <Grid item xs={12}>
              <Categories
                control={control}
                name="categories"
                label="Categories"
                helperText="Choose from existing ones or create new. It can be a cuisine type or dietary restrictions"
                rules={{ required: 'At least one category is required' }}
                loading={categoriesLoading}
                error={categoriesError ? 'Failed to load categories' : null}
                list={categories}
              />
            </Grid>
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

            <Grid item xs={12}>
              <Instructions
                control={control}
                name="instructions"
                rules={{ required: 'Instructions can not be empty' }}
              />
            </Grid>

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
                disabled={loading}
                endIcon={loading ? <CircularProgress color="inherit" size={14} /> : null}
              >
                Create
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button variant="outlined" fullWidth type="button" disabled={loading}>
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
