import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import logo from '../../img/logo.png';
import { Stack } from '@mui/material';

const Logo = () => (
  <Stack direction="row" alignItems="center" gap={{ xs: 1, md: 2 }} as={Link} to="/" sx={{ textDecoration: 'none' }}>
    <Box width={{ xs: 30, sm: 40, md: 60 }}>
      <img src={logo} alt="Site logo" width="100%" />
    </Box>
    <Typography
      as="div"
      sx={{ typography: { xs: 'body2', sm: 'h6', md: 'h5' } }}
      style={{ fontWeight: 500 }}
      variant="h6"
      color="text.secondary"
    >
      Recipe Blog
    </Typography>
  </Stack>
);

export default Logo;
