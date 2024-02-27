import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';

const SearchField = () => {
  return (
    <Paper component="form" elevation={0}>
      <IconButton type="submit" aria-label="Search" color="primary" size="small">
        <SearchIcon size="small" />
      </IconButton>
      <InputBase sx={{ minHeight: 36.5 }} placeholder="Search" inputProps={{ 'aria-label': 'Search recipe' }} />
    </Paper>
  );
};

export default SearchField;
