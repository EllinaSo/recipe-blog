import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const NewRecipe = () => {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
      <Paper sx={{ p: { xs: 4, sm: 6 } }}>
        <Typography fontWeight="medium" sx={{ typography: { xs: 'h6', md: 'h4' } }} mb={2}>
          Create a new recipe
        </Typography>
      </Paper>
    </Container>
  );
};

export default NewRecipe;
