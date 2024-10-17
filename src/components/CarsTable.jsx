// CarTable.js

import React from "react";

const CarTable = ({ carData }) => {
  return (
    <table className="w-fit md:w-1/2 shadow-lg rounded-lg overflow-hidden mt-4">
      <thead>
        <tr className="bg-orange-600 text-white text-sm font-bold uppercase leading-normal">
          <th className=" px-4 py-2">No</th>
          <th className=" px-4 py-2">Model</th>
          <th className=" px-4 py-2">Nomor Polisi</th>
        </tr>
      </thead>
      <tbody>
        {carData.length === 0 ? ( // Cek apakah tidak ada data rekaman
          <tr className=" bg-blue-100">
            <td colSpan="3" className="text-center text-2xl px-4 py-2">
              No records found
            </td>
          </tr>
        ) : (
          carData.map((car, index) => (
            <tr
              key={car.id}
              className="text-center text-[14px] even:bg-gray-100"
            >
              <td className=" px-2">{index + 1}</td>
              <td className=" px-2">{car.model}</td>
              <td className=" px-2">{car.nopol}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default CarTable;
