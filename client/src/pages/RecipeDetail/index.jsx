import { useEffect, useMemo } from 'react';
import useAxios from 'axios-hooks';
import { useNavigate, useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import { orange } from '@mui/material/colors';

import { handleError } from '../../utils/error';
import CategoriesList from '../../components/CategoriesList';

import List from './components/List';

const RecipeDetail = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  const [{ loading: recipeLoading, data, error: recipeError }, getRecipe] = useAxios({
    url: `api/recipe/${id}`,
    method: 'GET',
  });
  const [{ error: categoriesError, loading: categoriesLoading, data: categories = [] }, getCategories] = useAxios({
    url: `api/categories`,
    method: 'GET',
  });

  useEffect(() => {
    getRecipe();
    getCategories();
  }, []);

  const loading = recipeLoading || categoriesLoading;
  const error = recipeError || categoriesError;

  const recipe = useMemo(
    () =>
      data
        ? {
            ...data,
            categories:
              data.categories.map((recipeCategoryId) => categories.find(({ _id }) => _id === recipeCategoryId)) || null,
          }
        : null,
    [categories, data]
  );

  const timesList = useMemo(
    () =>
      data
        ? [
            <>
              <b>Total:</b> {recipe.totalTime}
            </>,
            <>
              <b>Preparation:</b> {recipe.prepTime}
            </>,
            <>
              <b>Cooking:</b> {recipe.cookTime}
            </>,
          ]
        : [],
    [data]
  );

  useEffect(() => {
    if (error) {
      handleError({ message: 'Recipe not found. Try again later' });
      navigate('/');
    }
  }, [error]);

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: { xs: 3, sm: 6 } }}>
        {loading || !data ? (
          <CircularProgress />
        ) : (
          <Stack gap={{ xs: 2, md: 4 }}>
            <Box
              position="relative"
              height={{ xs: 100, sm: 150, md: 200 }}
              sx={{
                borderRadius: 1,
                overflow: 'hidden',
                bgcolor: 'gray',
                backgroundImage: `url(${recipe.preview})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '50% 50%',
              }}
            />

            <Typography fontWeight="medium" sx={{ typography: { xs: 'h6', md: 'h4' } }}>
              {recipe.title}
            </Typography>

            <Typography>{recipe.description}</Typography>

            <Paper sx={{ p: 2, background: orange[50] }}>
              <Typography
                variant="h6"
                mb={1}
                sx={{ typography: { xs: 'body1', md: 'h6' }, fontWeight: { xs: 'bold' } }}
              >
                Preparation time
              </Typography>
              <List list={timesList} />
            </Paper>

            <div>
              <Typography fontWeight="medium" variant="h6" mb={1}>
                Ingredients
              </Typography>
              <List list={recipe.ingredients} />
            </div>

            <CategoriesList categories={recipe.categories} />

            <Divider />

            <div>
              <Typography fontWeight="medium" variant="h6" mb={1}>
                Instructions
              </Typography>
              <List as="ol" list={recipe.instructions} />
            </div>

            {recipe.note && (
              <div>
                <Typography fontWeight="medium" variant="h6" mb={1}>
                  Note
                </Typography>
                <Typography>{recipe.note}</Typography>
              </div>
            )}
          </Stack>
        )}
      </Paper>
    </Container>
  );
};

export default RecipeDetail;
