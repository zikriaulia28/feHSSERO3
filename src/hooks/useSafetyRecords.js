import axios from 'axios';
import useSWR from 'swr';

const fetcher = (url) => axios.get(url).then((res) => res.data);

const useSafetyRecords = () => {
  const { data: safetyRecords, error, mutate } = useSWR(
    `${process.env.REACT_APP_API_URL}/safetyRecords`,
    fetcher
  );

  // Fungsi untuk menambah rekaman safety baru
  const createSafetyRecord = async (record) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/safetyRecords`, record);
      mutate([...safetyRecords, response.data], false); // Optimistic update
    } catch (error) {
      console.error('Terjadi kesalahan saat menambah data.');
    }
  };

  // Fungsi untuk update rekaman safety
  const updateSafetyRecord = async (id, updatedRecord) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/safetyRecords/${id}`, updatedRecord);
      mutate(
        safetyRecords.map((record) => (record.id === id ? response.data : record)),
        false
      ); // Optimistic update
    } catch (error) {
      console.error('Terjadi kesalahan saat memperbarui data.');
    }
  };

  // Fungsi untuk hapus rekaman safety
  const deleteSafetyRecord = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/safetyRecords/${id}`);
      mutate(safetyRecords.filter((record) => record.id !== id), false); // Optimistic update
    } catch (error) {
      console.error('Terjadi kesalahan saat menghapus data.');
    }
  };

  return {
    safetyRecords,
    error,
    isLoading: !error && !safetyRecords,
    createSafetyRecord,
    updateSafetyRecord,
    deleteSafetyRecord,
  };
};

export default useSafetyRecords;
