import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import TwoPartBlock from '../../../../components/TwoPartBlock';

import mockImage from './img.jpg';

const Banner = () => (
  <TwoPartBlock
    sx={{ mb: { xs: 2, md: 4 } }}
    left={
      <>
        <Typography as="h1" mb={2} sx={{ typography: { xs: 'h6', md: 'h4' } }}>
          Welcome to Recipe Blog!
        </Typography>
        <Typography variant="body1">This is a demo project.</Typography>
        <Typography variant="body1">
          Explore the world of delicious and original recipes! Start your culinary journey right now!
        </Typography>
      </>
    }
    right={
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
        }}
      />
    }
  />
);

export default Banner;
