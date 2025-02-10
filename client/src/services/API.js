import axios from "axios";
const REACT_APP_BASEURL = "http://127.0.0.1:8080/";
const API = axios.create({ baseURL:REACT_APP_BASEURL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")} `;
  }
  return req;
});

export default API;
