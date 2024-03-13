import { useEffect, useMemo } from 'react';
import useAxios from 'axios-hooks';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';

import RecipeCard from '../../components/RecipeCard';

const Home = () => {
  const [{ loading: recipesLoading, data: recipes = [] }, getRecipes] = useAxios({
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
      recipes.map((recipe) => {
        console.log(recipe.categories);
        return {
          ...recipe,
          categories:
            recipe.categories.map((recipeCategoryId) => categories.find(({ _id }) => _id === recipeCategoryId)) || null,
        };
      }),
    [categories, recipes]
  );
  console.log(recipes);

  return (
    <Container maxWidth="xl">
      {recipesLoading || categoriesLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {list.map((recipe) => (
            <Grid container item xs={4} key={recipe._id}>
              <RecipeCard {...recipe} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Home;
