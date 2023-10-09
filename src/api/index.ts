import axios from "axios";

const url = "http://localhost:4000/api";

const api = axios.create({ baseURL: url });

export default api;
