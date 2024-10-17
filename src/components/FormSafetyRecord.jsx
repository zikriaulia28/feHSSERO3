import React from 'react';
import { toast } from 'react-toastify';
import useSafetyRecords from '../hooks/useSafetyRecords';

const FormSafetyRecord = ({ initialData, onClose }) => {
  const { createSafetyRecord, updateSafetyRecord } = useSafetyRecords();

  const [formData, setFormData] = React.useState({
    date: '',
    monthlySafeManhours: '',
    ytdSafeManhours: '',
    cumulativeSafeManhours: '',
    monthlySafeDriving: '',
    ytdSafeDriving: '',
    cumulativeSafeDriving: '',
    fatality: '',
    lostTimeInjury: '',
    incidentAccident: '',
    totalSicknessAbsence: '',
    sicknessAbsenceFrequency: '',
    environmentPollution: '',
    securityIncident: '',
  });
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (initialData) {
      const { id, ...dataWithoutId } = initialData;
      setFormData({ ...dataWithoutId });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initialData) {
        await updateSafetyRecord(initialData.id, formData);
        toast.success('Data berhasil diperbarui!', { position: 'top-right' });
      } else {
        await createSafetyRecord(formData);
        toast.success('Data berhasil dibuat!', { position: 'top-right' });
      }
      onClose();
    } catch (err) {
      setError('Terjadi kesalahan saat menyimpan data.');
      toast.error('Gagal menyimpan data, coba lagi.', { position: 'top-right' });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{initialData ? 'Edit' : 'Add'} Safety Record</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.keys(formData).map((key) => (
          <label key={key}>
            {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
            {key === 'date' && initialData ? (
              <span className="block w-full p-2 mb-4 border rounded bg-gray-100">
                {new Date(formData.date).toLocaleDateString('id-ID')}
              </span>
            ) : (
              <input
                type={key === 'date' ? 'date' : 'number'}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
                className="block w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </label>
        ))}

        <div className="flex justify-end mt-10">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Submit
          </button>
          <button type="button" onClick={onClose} className="ml-4 bg-gray-500 text-white p-2 rounded">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormSafetyRecord;
