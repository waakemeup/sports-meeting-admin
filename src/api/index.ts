import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    console.log(
      `${config.method?.toUpperCase()} request sent to ${
        config.url
      } at ${new Date().getTime()}`
    );
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export default axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});
