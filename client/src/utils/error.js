import { toast } from 'react-toastify';

export const handleAxiosError = (error) => toast.error(error.response?.data?.message || error.message);

export const handleError = (error) => toast.error(error.message);
