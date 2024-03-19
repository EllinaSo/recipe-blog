import { useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { grey } from '@mui/material/colors';

import { ImageInput } from '../../../../components/FormFields';

const Preview = ({ control, name, isSubmitted, rules }) => (
  <ImageInput
    label="Upload dish photo"
    control={control}
    name={name}
    rules={rules}
    renderPreview={useCallback(
      ({ loading, src, control, error }) => {
        const withError = !!(isSubmitted && error);
        return (
          <>
            <Box
              position="relative"
              height={{ xs: 100, sm: 150, md: 200 }}
              sx={{
                borderRadius: 1,
                border: withError ? `1px red` : '',
                overflow: 'hidden',
                bgcolor: grey[300],
                backgroundImage: `url(${src})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '50% 50%',
              }}
            >
              <Box
                position="absolute"
                top="50%"
                left="50%"
                sx={{ transform: 'translate(-50%, -50%)', bgcolor: 'rgba(255,255,255,0.9)', borderRadius: 1 }}
              >
                {control}
              </Box>
              <LinearProgress variant="determinate" value={loading} />
            </Box>

            {withError && (
              <Typography color="error" variant="caption" as="p">
                {error}
              </Typography>
            )}
          </>
        );
      },
      [isSubmitted]
    )}
  />
);

export default Preview;
