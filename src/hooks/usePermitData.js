import useSWR from 'swr';
import { fetcher, updatePermitStatus } from '../services/api';
import { toast } from 'react-toastify';

const usePermitData = () => {
  // Mengambil data dari API
  const { data: permitData, error: permitError, mutate } = useSWR(`${process.env.REACT_APP_API_URL}/permitDriving`, fetcher);

  const handleUpdateStatus = async (id, status) => {
    try {
      await updatePermitStatus(id, status);
      // Mengupdate data setelah status diperbarui
      toast.success(`Permit ${status}!`, { position: 'top-right' }); // Toast sukses
      mutate();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Permit Di Reject!', { position: 'top-right' });
    }
  };

  return {
    permitData: permitData || [], // Pastikan permitData adalah array
    permitError,
    isLoading: !permitError && !permitData, // Menambahkan state loading
    mutate,
    handleUpdateStatus
  };
};

export default usePermitData;
