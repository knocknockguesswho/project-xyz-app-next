import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import store from 'Redux/store';
import { appConfig } from 'config/app-config';
import { logoutSuccess } from 'Redux/actions/login-action';
import { IReduxActionResponse } from './redux-helper';
import { IAuthActionData } from 'Redux/reducers/auth-reducer';

export enum REFRESH_TOKEN {
  SUCCESS = 'REFRESH_TOKEN_SUCCESS'
}

const refreshTokenSuccess = (data: IAuthActionData): IReduxActionResponse<IAuthActionData> => ({
  type: REFRESH_TOKEN.SUCCESS,
  data,
});
class AxiosHelper {
  public config: AxiosRequestConfig;
  constructor() {
    this.config = {};
  }

  public createRequest(config: AxiosRequestConfig) {
    const stateNow = store.store.getState();
    let accessToken = stateNow.authReducer.accessToken ?? '';

    const { url, headers, ...restConfig } = config;
    const finalHeaders = { ...headers, Authorization: 'Bearer ' + accessToken };
    this.config = { ...restConfig, headers: finalHeaders, url: appConfig.apiUrl + url };
    const axiosInstance = axios.create();
    axiosInstance.interceptors.response.use(
      (res) => { return res; },
      async (err) => {
        const originalRequest = err.config;
        // #region Refresh Token
        if (err.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          await axios.request({
            method: 'POST',
            url: appConfig.apiUrl + '/v1/auth/refresh-token',
            timeout: 100000,
            withCredentials: true,
          }).then(async (res) => {
            accessToken = res.data.data.access_token;
            return store.store.dispatch(refreshTokenSuccess({ accessToken }));
          }).catch((reqError) => {
            if (reqError.response.status === 403) return store.store.dispatch(logoutSuccess());
            return Promise.reject(reqError);
          });
          originalRequest.headers.Authorization = 'Bearer ' + accessToken;
          return axiosInstance(originalRequest);
        }
        // #endregion Refresh Token
        return Promise.reject(err);
      }
    );
    return axiosInstance;
  }

  public runRequest(axiosInstance: AxiosInstance) {
    return axiosInstance.request(this.config);
  }
}

export const axiosHelper = new AxiosHelper();
