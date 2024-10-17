import React, { useState } from "react";
import FormClosePermit from "./FormClosePermit";

const PermitTable = ({ permitData, handleUpdateStatus, isAdmin, mutate }) => {
  const [selectedPermit, setSelectedPermit] = useState(null);
  const closeModal = () => {
    setSelectedPermit(null);
  };

  return (
    <>
      <table className="shadow-lg rounded-lg mt-4">
        {/* Header tabel */}
        <thead>
          <tr className="bg-green-600 text-white text-nowrap text-[12px] font-semibold uppercase">
            <th className="p-2">No</th>
            <th className="p-2">Tanggal</th>
            <th className="p-2">Status</th>
            {isAdmin && <th className="px-4 py-2">Aksi</th>}
            <th className="p-2">Pemohon</th>
            <th className="p-2">Nama Pengemudi</th>
            <th className="p-2">Nomor Polisi</th>
            <th className="p-2">Jenis Kendaraan</th>
            <th className="p-2">Tujuan</th>
            <th className="p-2">Barang Bawaan</th>
            <th className="p-2">Pemberi Izin</th>
            <th className="p-2">Security</th>
            <th className="p-2">KM Awal</th>
            <th className="p-2">KM Akhir</th>
            <th className="p-2">Fuel Level</th>
            <th className="p-2">Jam Keluar</th>
            <th className="p-2">Jam Masuk</th>
          </tr>
        </thead>
        <tbody>
          {permitData.length === 0 ? ( // Cek apakah tidak ada data rekaman
            <tr className="border rounded-lg text-2xl border-gray-300 bg-gray-100">
              <td colSpan="17" className="text-center  px-4 py-2">
                No records found
              </td>
            </tr>
          ) : (
            permitData.map((permitDriving, index) => (
              <tr
                key={permitDriving.id}
                className="text-center text-nowrap text-[14px] even:bg-gray-200 hover:bg-blue-200 transition duration-200"
              >
                <td className=" p-1">{index + 1}</td>
                <td className=" p-1">
                  {new Date(permitDriving.date).toLocaleDateString()}
                </td>
                <td className=" p-1">
                  <span
                    className={`border p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      permitDriving.status === "waiting"
                        ? "bg-yellow-400"
                        : permitDriving.status === "approved"
                        ? "bg-green-400"
                        : permitDriving.status === "rejected"
                        ? "bg-red-400"
                        : ""
                    }`}
                  >
                    {permitDriving.status.charAt(0).toUpperCase() +
                      permitDriving.status.slice(1)}
                  </span>
                </td>
                {isAdmin && (
                  <td className="flex justify-center items-centerp-1">
                    <button
                      onClick={() =>
                        handleUpdateStatus(permitDriving.id, "approved")
                      }
                      className={`py-1 px-2 rounded text-white ${
                        isAdmin && permitDriving.status === "waiting"
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                      disabled={
                        !(isAdmin && permitDriving.status === "waiting")
                      }
                    >
                      Accept
                    </button>
                    <button
                      onClick={() =>
                        handleUpdateStatus(permitDriving.id, "rejected")
                      }
                      className={`py-1 px-2 rounded text-white ml-2 ${
                        isAdmin && permitDriving.status === "waiting"
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                      disabled={
                        !(isAdmin && permitDriving.status === "waiting")
                      }
                    >
                      Reject
                    </button>
                  </td>
                )}
                <td className="p-1">{permitDriving.pemohon}</td>
                <td className="p-1">{permitDriving.namaPengemudi}</td>
                <td className="p-1">{permitDriving.car.nopol}</td>
                <td className="p-1">{permitDriving.car.model}</td>
                <td className="p-1">{permitDriving.tujuan}</td>
                <td className="p-1">{permitDriving.barangBawaan}</td>
                <td className="p-1">{permitDriving.pemberiIzin}</td>
                <td className="p-1">{permitDriving.petugasSecurity}</td>
                <td className="p-1">{permitDriving.kmAwal}</td>
                <td className="p-1">{permitDriving.kmAkhir || "-"}</td>
                <td className="p-1">{permitDriving.fuelLevel}</td>
                <td className="p-1">
                  {permitDriving.jamKeluar
                    ? permitDriving.jamKeluar.slice(11, 16)
                    : "-"}
                </td>
                <td className="p-1">
                  {permitDriving.jamMasuk
                    ? permitDriving.jamMasuk.slice(11, 16)
                    : "-"}
                </td>
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
