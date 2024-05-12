import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseURL = process.env.RENTALY_API_APP_SERVER; // Sử dụng biến môi trường để lấy baseURL
const rentalRequester = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

rentalRequester.interceptors.request.use((config) => {
  return config;
});

rentalRequester.interceptors.response.use(
  function (response) {
    return Promise.resolve(response.data);
  },
  function (error) {
    if (error.response) {
      error.status = error.response.status;
      error.message = error.response.statusText;
      if (error.response.data && error.response.data.error) {
        error.message = error.response.data.error;
      }
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    console.log(error);
    return Promise.reject(error);
  }
);
export function setAxiosToken(token) {
  rentalRequester.defaults.headers.common.X_authorization = 'Bearer ' + token;
}

export function removeAxiosToken() {
  rentalRequester.defaults.headers.common.Authorization = '';
}
export default rentalRequester;
