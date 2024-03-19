import { useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';
import { Link as RouterLink } from 'react-router-dom';
import useAxios from 'axios-hooks';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { useContextData } from '../../context';
import CategoriesList from '../../components/CategoriesList';

const DashboardRecipes = () => {
  const {
    profile: { _id: userId },
  } = useContextData();

  const [startIndex, setStartIndex] = useState(0);
  const [limit, setLimit] = useState(6);

  const [{ error: recipesError, loading: recipesLoading, data: { recipes = [], total = 1 } = {} }, getRecipes] =
    useAxios({
      url: `api/recipes`,
      method: 'GET',
    });
  const [{ error: categoriesError, loading: categoriesLoading, data: categories = [] }, getCategories] = useAxios({
    url: `api/categories`,
    method: 'GET',
  });

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getRecipes({ params: { limit, startIndex, userId } });
  }, [limit, startIndex]);

  const list = useMemo(
    () =>
      recipes.map((recipe) => ({
        ...recipe,
        categories:
          recipe.categories.map((recipeCategoryId) => categories.find(({ _id }) => _id === recipeCategoryId)) || null,
      })),
    [categories, recipes]
  );

  const handleChangePage = (_, newPage) => setStartIndex(newPage);

  const handleChangeRowsPerPage = (event) => {
    setLimit(+event.target.value);
    setStartIndex(0);
  };

  const loading = recipesLoading || categoriesLoading;
  const error = recipesError || categoriesError;

  const content = useMemo(() => {
    if (loading) {
      return (
        <TableRow>
          <TableCell colspan="7">
            <CircularProgress size={20} />
          </TableCell>
        </TableRow>
      );
    }
    if (error) {
      return (
        <TableRow>
          <TableCell colspan="7">
            <Typography variant="body2" color="error">
              Something went wrong! Try again later
            </Typography>
          </TableCell>
        </TableRow>
      );
    }
    return list.length && categories.length ? (
      list.map(({ _id: id, title, updatedAt, createdAt, preview, categories }) => (
        <TableRow key={id} hover>
          <TableCell>
            <Box maxWidth={100}>
              <img src={preview} alt={`Preview of ${title}`} width="100%" />
            </Box>
          </TableCell>
          <TableCell sx={{ fontWeight: 'bold' }}>
            <Link component={RouterLink} to={`/recipes/${id}`} target="_blank">
              {title}
            </Link>
          </TableCell>
          <TableCell>
            <CategoriesList categories={categories} />
          </TableCell>
          <TableCell>{format(createdAt, 'd MMM yyyy')}</TableCell>
          <TableCell>{format(updatedAt, 'd MMM yyyy')}</TableCell>
          <TableCell align="right">
            <IconButton aria-label="Edit recipe">
              <EditIcon />
            </IconButton>
            <IconButton aria-label="Delete recipe">
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell colspan="7">You have no recipes yet!</TableCell>
      </TableRow>
    );
  }, [loading]);

  return (
    <Container maxWidth="xl">
      <Paper
        sx={{
          overflow: 'hidden',
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <TableContainer>
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="Recipes list">
            <TableHead>
              <TableRow>
                <TableCell width="10%">Preview</TableCell>
                <TableCell width="30%">Title</TableCell>
                <TableCell width="30%">Categories</TableCell>
                <TableCell width="10%">Created</TableCell>
                <TableCell width="10%">Updated</TableCell>
                <TableCell width="10%" align="right"></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>{content}</TableBody>
          </Table>
        </TableContainer>
        {!!list.length && !categoriesError && (
          <TablePagination
            sx={{ flexShrink: 0 }}
            rowsPerPageOptions={[6, 10, 20]}
            component="div"
            count={total}
            rowsPerPage={limit}
            page={startIndex}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Paper>
    </Container>
  );
};

export default DashboardRecipes;
