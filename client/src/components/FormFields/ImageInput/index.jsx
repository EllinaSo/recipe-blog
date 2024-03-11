import { useRef, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { Controller } from 'react-hook-form';
import Button from '@mui/material/Button';

import { app } from '../../../firebase';
import { handleError } from '../../../utils/error';
import VisuallyHiddenInput from '../VisuallyHiddenInput';

const MB_SIZE_LIMIT = 2;

export const ImageInput = ({ control, rules, label, name, renderPreview }) => {
  const fileInputRef = useRef();

  const [loading, setLoading] = useState(0);

  const resetInput = () => (fileInputRef.current.value = '');

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        ...rules,
        validate: {
          isSuccessfullyLoaded: (v) => (rules?.required ? v.startsWith('http') || 'Image has not been uploaded' : true),
        },
      }}
      render={({ field, formState, fieldState: { error } }) => {
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

        return renderPreview({
          src: typeof field.value === 'string' ? field.value : URL.createObjectURL(field.value),
          loading,
          error: error?.message,
          control: (
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
          ),
        });
      }}
    />
  );
};

export default ImageInput;
