import axios from 'axios';
import { Dispatch } from 'redux';
import { IReduxActionResponse } from 'helpers/redux-helper';

export enum LOGIN_ACTIONS {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL'
}

export enum LOGOUT_ACTIONS {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL'
}

export interface IRequestLogin {
  username: string;
  password: string;
}

export const loginBegin = (): IReduxActionResponse => ({
  type: LOGIN_ACTIONS.LOADING
});

export const loginSuccess = (data: Record<string, string | undefined>): IReduxActionResponse => ({
  type: LOGIN_ACTIONS.SUCCESS,
  data
});

export const loginFailed = (message: string): IReduxActionResponse => ({
  type: LOGIN_ACTIONS.FAIL,
  message
})

export const logoutBegin = (): IReduxActionResponse => ({
  type: LOGOUT_ACTIONS.LOADING
});

export const logoutSuccess = (): IReduxActionResponse => ({
  type: LOGOUT_ACTIONS.SUCCESS
});

export const logoutFailed = (message: string): IReduxActionResponse => ({
  type: LOGOUT_ACTIONS.FAIL,
  message
})

export const requestLogin = (data: IRequestLogin) => async (dispatch: Dispatch<any>) => {
  dispatch(loginBegin())
  try {
    const bodyFormData = new FormData()
    bodyFormData.append('username', data.username)
    bodyFormData.append('password', data.password)
    await axios.post(
      'http://127.0.0.1:5000/v1/auth/login',
      bodyFormData,
      {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(async (res) => {
        const refreshTokenBodyFormData = new FormData()
        refreshTokenBodyFormData.append('refresh_token', res.data.data.refresh_token)
        await axios.post(
          'http://127.0.0.1:5000/v1/auth/refresh-token',
          refreshTokenBodyFormData,
          {
            headers: { 'Content-Type': 'multipart/form-data' }
          }
        ).then((refreshTokenRes) => {
          dispatch(loginSuccess({ access_token: refreshTokenRes.data.data.access_token, refresh_token: refreshTokenRes.data.data.refresh_token }))
        })
      })
  } catch (err: any) {
    dispatch(loginFailed(err.response.data.message))
  }
};

export const requestLogout = () => async (dispatch: Dispatch<any>) => {
  dispatch(logoutBegin())
  try {
    // TODO: add logout api on backend
    dispatch(logoutSuccess())
  } catch (err: any) {
    dispatch(logoutFailed('ok'))
  }
}

export default () => ({ requestLogin, requestLogout })
