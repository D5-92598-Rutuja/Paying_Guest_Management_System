import axios from "axios";

const BASE_URL = "http://localhost:8080/api/announcements";

export const getAnnouncements = () => {
  return axios.get(BASE_URL);
};

export const addAnnouncement = (data) => {
  return axios.post(BASE_URL, data);
};
