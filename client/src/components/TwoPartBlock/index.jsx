import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const TwoPartBlock = ({ left, right, sx }) => (
  <Paper sx={{ p: { xs: 3, sm: 6 }, ...sx }}>
    <Stack gap={4} direction="row" sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
      <Stack width={{ xs: '100%', md: '50%' }} justifyContent="center" gap={{ xs: 0, md: 1 }}>
        {left}
      </Stack>

      <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />

      <Box width={{ xs: '100%', md: '50%' }}>{right}</Box>
    </Stack>
  </Paper>
);

export default TwoPartBlock;
