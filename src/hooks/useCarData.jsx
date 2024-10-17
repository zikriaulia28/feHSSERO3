import useSWR from 'swr';
import { fetcher } from '../services/api'; // Pastikan fetcher diimpor dari layanan API yang Anda gunakan

const useCarData = () => {
  const { data: carData, error: carError, mutate } = useSWR(`${process.env.REACT_APP_API_URL}/cars`, fetcher);

  return { carData, carError, mutate };
};

export default useCarData;