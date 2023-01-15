import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import storage from 'redux-persist/lib/storage';
import { appConfig } from 'config/app-config'

class AxiosHelper {
  public config: AxiosRequestConfig;
  constructor() {
    this.config = {};
  }

  public createRequest(config: AxiosRequestConfig) {
    const { url, ...restConfig } = config
    this.config = { ...restConfig, url: appConfig.apiUrl + url };
    const axiosInstance = axios.create();
    axiosInstance.interceptors.response.use(
      res => { return res },
      async (err) => {
        const originalRequest = err.config;
        // #region Refresh Token
        if (err.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          let accessToken = '';
          await axios.request({
            method: 'POST',
            url: appConfig.apiUrl + '/v1/auth/refresh-token',
            timeout: 100000,
            withCredentials: true
          }).then(async (res) => {
            accessToken = res.data.data.access_token;
            const persistPrimary = await storage.getItem('persist:primary')
              .then((val) => {
                let persistPrimary = JSON.parse(val as string);
                let authReducer = JSON.parse(persistPrimary['authReducer']);
                authReducer['accessToken'] = accessToken;
                authReducer = JSON.stringify(authReducer);
                persistPrimary['authReducer'] = authReducer;
                persistPrimary = JSON.stringify(persistPrimary)
                return persistPrimary
              })
              .catch((err) => Promise.reject(err))
            await storage.setItem('persist:primary', persistPrimary)
          }).catch((err) => Promise.reject(err))
          originalRequest.headers['Authorization'] = 'Bearer ' + accessToken;
          return axiosInstance(originalRequest)
        }
        // #endregion Refresh Token
        return Promise.reject(err)
      }
    )
    return axiosInstance;
  }

  public runRequest(axiosInstance: AxiosInstance) {
    return axiosInstance.request(this.config);
  }
}

export const axiosHelper = new AxiosHelper();
