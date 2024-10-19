// UserTable.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const UserTable = ({ userData, onEdit, onDelete, isAdmin }) => {
  return (
    <table className="w-fit md:w-1/2 shadow-lg rounded-lg overflow-hidden mt-4">
      <thead>
        <tr className="bg-orange-600 text-white text-sm font-bold uppercase leading-normal">
          <th className=" px-4 py-2">No</th>
          <th className=" px-4 py-2">Email</th>
          <th className=" px-4 py-2">Name</th>
          <th className=" px-4 py-2">Position</th>
          <th className=" px-4 py-2">Role</th>
          <th className=" px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {userData.length === 0 ? ( // Cek apakah tidak ada data rekaman
          <tr className=" bg-blue-100">
            <td colSpan="5" className="text-center text-2xl px-4 py-2">
              No records found
            </td>
          </tr>
        ) : (
          userData.map((user, index) => (
            <tr
              key={user.id}
              className="text-center text-[14px] even:bg-gray-100"
            >
              <td className=" px-2">{index + 1}</td>
              <td className=" px-2">{user.email}</td>
              <td className=" px-2">{user.name}</td>
              <td className=" px-2">{user.position}</td>
              <td className=" px-2">{user.role}</td>
              {isAdmin && (
                <td className="px-4 py-2">
                  <div className="flex justify-center">
                    <button
                      onClick={() => onEdit(user)}
                      className="text-green-500 p-2 hover:text-green-700 transition duration-200"
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button
                      onClick={() => onDelete(user.id)}
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
  );
};

export default UserTable;
