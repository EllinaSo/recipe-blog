import { useRef, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { Controller } from 'react-hook-form';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { app } from '../../../firebase';
import { handleError } from '../../../utils/error';
import VisuallyHiddenInput from '../VisuallyHiddenInput';

const MB_SIZE_LIMIT = 2;
const SIZE = 60;

export const ImageInput = ({ control, rules, label, name }) => {
  const fileInputRef = useRef();

  const [loading, setLoading] = useState(0);

  const resetInput = () => (fileInputRef.current.value = '');

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        ...rules,
        required: true,
        validate: {
          isSuccessfullyLoaded: (v) => v.startsWith('http') || 'The avatar has not been uploaded',
        },
      }}
      render={({ field, formState, fieldState: { error }, formState: { isSubmitted } }) => {
        const handleImageChange = (e) => {
          const file = e.target.files[0];
          if (!file) {
            return;
          }

          if (file?.type.startsWith('image/') && file.size / 1024 / 1024 < MB_SIZE_LIMIT) {
            field.onChange(URL.createObjectURL(file));

            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
              'state_changed',
              (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setLoading(Number(progress.toFixed(0)));
              },
              (error) => {
                setLoading(0);
                handleError({ message: 'Could not upload image' });
                field.onChange(formState.defaultValues[field.name]);
                resetInput();
              },
              () => getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => field.onChange(downloadURL))
            );
          } else {
            resetInput();
            handleError({ message: "Image is invalid or it's SIZE is more than 2MB" });
          }
        };

        return (
          <Stack direction="row" gap={1} alignItems="center">
            <Box position="relative">
              <Avatar
                src={typeof field.value === 'string' ? field.value : URL.createObjectURL(field.value)}
                sx={{ width: SIZE, height: SIZE }}
                alt="User avatar"
              />
              <CircularProgress
                variant="determinate"
                value={loading}
                size={SIZE}
                sx={{ position: 'absolute', top: 0, left: 0 }}
              />
            </Box>
            <div>
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
              {!!(isSubmitted && error) && (
                <Typography color="error" variant="caption" as="p" ml={1}>
                  {error.message}
                </Typography>
              )}
            </div>
          </Stack>
        );
      }}
    />
  );
};

export default ImageInput;
