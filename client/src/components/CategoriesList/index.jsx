import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const CategoriesList = ({ categories }) => (
  <Stack direction="row" gap={1} flexWrap="wrap">
    {categories.map((category) => (
      <Chip key={category._id} label={category.name} color="warning" variant="outlined" />
    ))}
  </Stack>
);

export default CategoriesList;
