import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
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
    return axiosInstance;
  }

  public runRequest(axiosInstance: AxiosInstance) {
    return axiosInstance.request(this.config);
  }
}

export const axiosHelper = new AxiosHelper();
