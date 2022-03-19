import axios from "axios";

export default axios.create({
  baseURL: process.env.APP_URL,
  withCredentials: true,
});
