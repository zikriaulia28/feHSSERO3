import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const SafetyRecordTable = ({ records, onEdit, onDelete, isAdmin }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-purple-600 text-white text-[10px] font-bold uppercase leading-normal">
            <th className="p-2">No.</th>
            <th className="p-2">Date</th>
            <th className="p-2">Monthly Safe Manhours</th>
            <th className="p-2">YTD Safe Manhours</th>
            <th className="p-2">Cumulative Safe Manhours</th>
            <th className="p-2">Monthly Safe Driving</th>
            <th className="p-2">YTD Safe Driving</th>
            <th className="p-2">Cumulative Safe Driving</th>
            <th className="p-2">Fatality</th>
            <th className="p-2">Lost Time Injury</th>
            <th className="p-2">Incident / Accident</th>
            <th className="p-2">Total Sickness Absence</th>
            <th className="p-2">Total Sickness Absence (Maks 0.45)</th>
            <th className="p-2">Environment Pollution</th>
            <th className="p-2">Security Incident</th>
            {isAdmin && <th className="p-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {records.length === 0 ? ( // Cek apakah tidak ada data rekaman
            <tr className="border text-2xl border-gray-300 bg-gray-100">
              <td colSpan="16" className="text-center  px-4 py-2">
                No records found
              </td>
            </tr>
          ) : (
            records.map((record, index) => (
              <tr
                key={record.id}
                className="text-nowrap text-[14px] even:bg-gray-200 hover:bg-blue-200 transition duration-200"
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  {new Date(record.date).toISOString().split("T")[0]}{" "}
                  {/* Format tanggal */}
                </td>
                <td className="px-4 py-2">{record.monthlySafeManhours}</td>
                <td className="px-4 py-2">{record.ytdSafeManhours}</td>
                <td className="px-4 py-2">{record.cumulativeSafeManhours}</td>
                <td className="px-4 py-2">{record.monthlySafeDriving}</td>
                <td className="px-4 py-2">{record.ytdSafeDriving}</td>
                <td className="px-4 py-2">{record.cumulativeSafeDriving}</td>
                <td className="px-4 py-2">{record.fatality}</td>
                <td className="px-4 py-2">{record.lostTimeInjury}</td>
                <td className="px-4 py-2">{record.incidentAccident}</td>
                <td className="px-4 py-2">{record.totalSicknessAbsence}</td>
                <td className="px-4 py-2">{record.sicknessAbsenceFrequency}</td>
                <td className="px-4 py-2">{record.environmentPollution}</td>
                <td className="px-4 py-2">{record.securityIncident}</td>
                {isAdmin && (
                  <td className="px-4 py-2">
                    <div className="flex justify-center">
                      <button
                        onClick={() => onEdit(record)}
                        className="text-green-500 p-2 hover:text-green-700 transition duration-200"
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </button>
                      <button
                        onClick={() => onDelete(record.id)}
                        className="text-red-500 p-2 hover:text-red-700 transition duration-200"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SafetyRecordTable;
