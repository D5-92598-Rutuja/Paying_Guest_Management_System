import axios from "axios";

const API_URL = "http://localhost:8080/api/announcements";

export const getAnnouncements = () => {
  return axios.get(API_URL);
};

export const addAnnouncement = (data) => {
  return axios.post(API_URL, data);
};

export const updateAnnouncement = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data);
};

export const deleteAnnouncement = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};