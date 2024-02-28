import { toast } from 'react-toastify';
export const handleAxiosError = (error) => toast.error(error.response?.data?.message || error.message);
