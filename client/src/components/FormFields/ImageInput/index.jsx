import { useRef } from 'react';

import { Controller } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const size = { xs: 50, sm: 70 };

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const ImageInput = ({ control, rules, label, name }) => {
  const fileInputRef = useRef();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => {
        const handleImageChange = (e) => {
          const file = e.target.files[0];
          if (file?.type.startsWith('image/')) {
            field.onChange(file);
          } else {
            fileInputRef.current.value = '';
          }
        };

        return (
          <Stack direction="row" gap={1} alignItems="center">
            <Avatar
              src={typeof field.value === 'string' ? field.value : URL.createObjectURL(field.value)}
              alt="User avatar"
              sx={{ width: size, height: size }}
            />
            <Button variant="text" component="label" role={undefined} tabIndex={-1}>
              {label}
              <VisuallyHiddenInput
                hidden
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                name={name}
              />
            </Button>
          </Stack>
        );
      }}
    />
  );
};

export default ImageInput;
