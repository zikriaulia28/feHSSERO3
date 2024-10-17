import React from 'react';

const EditStatusPermit = ({ permitId, currentStatus, onStatusChange }) => {
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    onStatusChange(permitId, newStatus);
  };

  return (
    <select
      value={currentStatus}
      onChange={handleStatusChange}
      className={`border p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${currentStatus === 'waiting'
        ? 'bg-yellow-400'
        : currentStatus === 'approved'
          ? 'bg-green-400'
          : currentStatus === 'rejected'
            ? 'bg-red-400'
            : ''
        }`}
    >
      <option value="approved">Approved</option>
      <option value="rejected">Rejected</option>
    </select>
  );
};

export default EditStatusPermit;