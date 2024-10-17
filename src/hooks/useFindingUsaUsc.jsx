import axios from "axios";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const useFindingsUsaUsc = () => {
  const {
    data: findingRecords,
    error,
    mutate,
  } = useSWR(`${process.env.REACT_APP_API_URL}/usaTemuan`, fetcher);

  // Fungsi untuk menambah temuan USA/USC baru
  const createFindingUsaUsc = async (record) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/usaTemuan`,
        record
      );
      mutate([...findingRecords, response.data], false); // Optimistic update
    } catch (error) {
      console.error("Terjadi kesalahan saat menambah data.");
    }
  };

  // Fungsi untuk update temuan USA/USC
  const updateFindingUsaUsc = async (id, updatedRecord) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/usaTemuan/${id}`,
        updatedRecord
      );
      mutate(
        findingRecords.map((record) =>
          record.id === id ? response.data : record
        ),
        false
      ); // Optimistic update
    } catch (error) {
      console.error("Terjadi kesalahan saat memperbarui data.");
    }
  };

  // Fungsi untuk hapus temuan USA/USC
  const deleteFindingUsaUsc = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/usaTemuan/${id}`);
      mutate(
        findingRecords.filter((record) => record.id !== id),
        false
      ); // Optimistic update
    } catch (error) {
      console.error("Terjadi kesalahan saat menghapus data.");
    }
  };

  return {
    findingRecords,
    error,
    isLoading: !error && !findingRecords,
    createFindingUsaUsc,
    updateFindingUsaUsc,
    deleteFindingUsaUsc,
  };
};

export default useFindingsUsaUsc;
