import axios from 'axios';

export const fetcher = url => axios.get(url).then(res => res.data);

export const updatePermitStatus = (id, status) => {
  return axios.put(`${process.env.REACT_APP_API_URL}/permitDriving/${id}/status`, { status });
};

export const addPermitData = (data) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/permitDriving`, data);
};
