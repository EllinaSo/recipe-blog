import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import mockImage from './img.jpg';

const Banner = () => {
  return (
    <Paper sx={{ p: { xs: 4, sm: 6 }, mb: { xs: 2, md: 4 } }}>
      <Stack gap={4} direction="row" sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
        <Stack width={{ xs: '100%', md: '50%' }} justifyContent="center" gap={{ xs: 0, md: 1 }} sx={{ flexShrink: 0 }}>
          <Typography as="h1" mb={2} sx={{ typography: { xs: 'h6', md: 'h4' } }}>
            Welcome to Recipe Blog!
          </Typography>
          <Typography variant="body1">This is a demo project.</Typography>
          <Typography variant="body1">
            Explore the world of delicious and original recipes! Start your culinary journey right now!
          </Typography>
        </Stack>

        <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />

        <Box
          sx={{
            borderRadius: 1,
            overflow: 'hidden',
            backgroundImage: `url(${mockImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '50% 50%',
            height: { xs: 150, md: 250 },
            width: '100%',
            maxWidth: 800,
            flexGrow: 0,
          }}
        />
      </Stack>
    </Paper>
  );
};

export default Banner;
