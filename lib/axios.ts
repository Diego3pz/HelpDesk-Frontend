import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost/api", 
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
  },
});

export default api;

