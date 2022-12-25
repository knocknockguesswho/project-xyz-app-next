import axios from 'axios';
import { Dispatch } from 'redux';
import { IReduxActionResponse } from 'helpers/redux-helper';

export enum REFRESH_TOKEN {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL'
}

export interface IRequestRefreshToken {
  refresh_token: string;
}

export const refreshTokenBegin = (): IReduxActionResponse => ({
  type: REFRESH_TOKEN.LOADING
});

export const refreshTokenSuccess = (data: Record<string, string>): IReduxActionResponse => ({
  type: REFRESH_TOKEN.SUCCESS,
  data
});

export const refreshTokenFailed = (message: string): IReduxActionResponse => ({
  type: REFRESH_TOKEN.FAIL,
  message
})

export const requestRefreshToken = (data: IRequestRefreshToken) => async (dispatch: Dispatch<any>) => {
  dispatch(refreshTokenBegin())
  try {
    const bodyFormData = new FormData()
    bodyFormData.append('refresh_token', data.refresh_token)
    await axios.post(
      'http://127.0.0.1:5000/v1/auth/refresh-token',
      bodyFormData,
      {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then((res) => dispatch(refreshTokenSuccess(res.data.data)))
  } catch (err: any) {
    dispatch(refreshTokenFailed(err.response.data.message))
  }
};

export default requestRefreshToken
