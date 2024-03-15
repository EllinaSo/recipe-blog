import { useEffect, useMemo } from 'react';
import useAxios from 'axios-hooks';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import RecipeCard from '../../components/RecipeCard';
import Banner from './components/Banner';

const Home = () => {
  const [{ loading: recipesLoading, data: { recipes = [] } = {} }, getRecipes] = useAxios({
    url: `api/recipes`,
    method: 'GET',
  });
  const [{ loading: categoriesLoading, data: categories = [] }, getCategories] = useAxios({
    url: `api/categories`,
    method: 'GET',
  });

  useEffect(() => {
    getRecipes();
    getCategories();
  }, []);

  const list = useMemo(
    () =>
      recipes.map((recipe) => ({
        ...recipe,
        categories:
          recipe.categories.map((recipeCategoryId) => categories.find(({ _id }) => _id === recipeCategoryId)) || null,
      })),
    [categories, recipes]
  );

  return (
    <Container maxWidth="xl">
      <Banner />
      <Typography as="h2" sx={{ typography: { xs: 'h6', md: 'h5' } }} mb={2}>
        New Recipes
      </Typography>
      {recipesLoading || categoriesLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {list.map((recipe) => (
            <Grid container item xs={12} sm={6} md={4} key={recipe._id}>
              <RecipeCard {...recipe} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Home;
