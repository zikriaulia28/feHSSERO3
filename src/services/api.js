import axios from 'axios';

export const fetcher = url => axios.get(url).then(res => res.data);

export const updatePermitStatus = (id, status) => {
  return axios.put(`http://localhost:3001/permitDriving/${id}/status`, { status });
};

export const addPermitData = (data) => {
  return axios.post('http://localhost:3001/permitDriving', data);
};
