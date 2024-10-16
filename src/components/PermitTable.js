import React, { useState } from 'react';
import FormClosePermit from './FormClosePermit';

const PermitTable = ({ permitData, handleUpdateStatus, isAdmin, mutate }) => {
  const [selectedPermit, setSelectedPermit] = useState(null);

  const openClosePermitModal = (permit) => {
    setSelectedPermit(permit);
  };

  const closeModal = () => {
    setSelectedPermit(null);
  };

  return (
    <>
      <table className="border border-gray-300 shadow-lg rounded-lg mt-4">
        {/* Header tabel */}
        <thead>
          <tr className="bg-green-600 text-white text-[10px] text-nowrap font-bold uppercase leading-normal">
            <th className="border border-gray-300 p-2">No</th>
            <th className="border border-gray-300 p-2">Tanggal</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Pemohon</th>
            <th className="border border-gray-300 p-2">Nama Pengemudi</th>
            <th className="border border-gray-300 p-2">Nomor Polisi</th>
            <th className="border border-gray-300 p-2">Jenis Kendaraan</th>
            <th className="border border-gray-300 p-2">Tujuan</th>
            <th className="border border-gray-300 p-2">Barang Bawaan</th>
            <th className="border border-gray-300 p-2">Pemberi Izin</th>
            <th className="border border-gray-300 p-2">Security</th>
            <th className="border border-gray-300 p-2">KM Awal</th>
            <th className="border border-gray-300 p-2">KM Akhir</th>
            <th className="border border-gray-300 p-2">Fuel Level</th>
            <th className="border border-gray-300 p-2">Jam Keluar</th>
            <th className="border border-gray-300 p-2">Jam Masuk</th>
            {isAdmin && <th className="border border-gray-300 px-4 py-2">Aksi</th>}

          </tr>
        </thead>
        <tbody>
          {permitData.length === 0 ? ( // Cek apakah tidak ada data rekaman
            <tr className='border rounded-lg text-2xl border-gray-300 bg-gray-100'>
              <td colSpan="17" className="text-center  px-4 py-2">
                No records found
              </td>
            </tr>
          ) : (
            permitData.map((permitDriving, index) => (
              <tr key={permitDriving.id} className="text-center text-nowrap text-[14px] even:bg-gray-200 hover:bg-blue-200 transition duration-200">
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{new Date(permitDriving.date).toLocaleDateString()}</td>
                <td className="border border-gray-300 p-2">
                  <span
                    className={`border p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${permitDriving.status === 'waiting' ? 'bg-yellow-400' :
                      permitDriving.status === 'approved' ? 'bg-green-400' :
                        permitDriving.status === 'rejected' ? 'bg-red-400' : ''
                      }`}
                  >
                    {permitDriving.status.charAt(0).toUpperCase() + permitDriving.status.slice(1)}
                  </span>
                </td>
                <td className="border border-gray-300 p-2">{permitDriving.pemohon}</td>
                <td className="border border-gray-300 p-2">{permitDriving.namaPengemudi}</td>
                <td className="border border-gray-300 p-2">{permitDriving.car.nopol}</td>
                <td className="border border-gray-300 p-2">{permitDriving.car.model}</td>
                <td className="border border-gray-300 p-2">{permitDriving.tujuan}</td>
                <td className="border border-gray-300 p-2">{permitDriving.barangBawaan}</td>
                <td className="border border-gray-300 p-2">{permitDriving.pemberiIzin}</td>
                <td className="border border-gray-300 p-2">{permitDriving.petugasSecurity}</td>
                <td className="border border-gray-300 p-2">{permitDriving.kmAwal}</td>
                <td className="border border-gray-300 p-2">{permitDriving.kmAkhir || '-'}</td>
                <td className="border border-gray-300 p-2">{permitDriving.fuelLevel}</td>
                <td className="border border-gray-300 p-2">
                  {permitDriving.jamKeluar ? permitDriving.jamKeluar.slice(11, 16) : '-'}
                </td>
                <td className="border border-gray-300 p-2">
                  {permitDriving.jamMasuk ? permitDriving.jamMasuk.slice(11, 16) : '-'}
                </td>
                {isAdmin &&
                  <td className="flex justify-center items-center p-2">
                    <button
                      onClick={() => handleUpdateStatus(permitDriving.id, 'approved')}
                      className={`py-1 px-2 rounded text-white ${isAdmin && permitDriving.status === 'waiting' ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'}`}
                      disabled={!(isAdmin && permitDriving.status === 'waiting')}
                    >
                      Terima
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(permitDriving.id, 'rejected')}
                      className={`py-1 px-2 rounded text-white ml-2 ${isAdmin && permitDriving.status === 'waiting' ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-400 cursor-not-allowed'}`}
                      disabled={!(isAdmin && permitDriving.status === 'waiting')}
                    >
                      Tolak
                    </button>
                  </td>}
              </tr>
            ))
          )}
        </tbody>
      </table>


      {/* Modal untuk menutup permit */}
      {selectedPermit && (
        <FormClosePermit
          permitId={selectedPermit.id}
          kmKeluar={selectedPermit.kmAwal}
          onClose={closeModal}
          mutate={mutate} // Pastikan mutate ditambahkan untuk memperbarui data
        />
      )}
    </>
  );
};

export default PermitTable;
