import { Dispatch } from 'redux';
import { IReduxActionResponse } from 'helpers/redux-helper';
import { IAuthReducer } from 'Redux/reducers/auth-reducer';
import { axiosHelper } from 'helpers/axios-helper';

export enum LOGIN_ACTIONS {
  LOADING = 'LOGIN_LOADING',
  SUCCESS = 'LOGIN_SUCCESS',
  FAIL = 'LOGIN_FAIL'
}

export enum LOGOUT_ACTIONS {
  LOADING = 'LOGOUT_LOADING',
  SUCCESS = 'LOGOUT_SUCCESS',
  FAIL = 'LOGOUT_FAIL'
}

export interface IRequestLogin {
  username: string;
  password: string;
}
export interface IRequestRefreshToken {
  refresh_token: string;
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

export const logoutSuccess = (): IReduxActionResponse => ({
  type: LOGOUT_ACTIONS.SUCCESS
});


export const requestLogin = (data: IRequestLogin) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(loginBegin())
    const bodyFormData = new FormData()
    bodyFormData.append('username', data.username)
    bodyFormData.append('password', data.password)
    const request = axiosHelper.createRequest({
      method: 'POST',
      url: '/v1/auth/login',
      data: bodyFormData,
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 100000,
      withCredentials: true
    })
    await axiosHelper.runRequest(request)
      .then((res) => {
        dispatch(loginSuccess({ access_token: res.data.data.access_token, userData: res.data.data.data }))
      })
      .catch((err) => {
        throw new Error(err.response.data.message)
      })
  } catch (err: any) {
    console.error(err)
    dispatch(loginFailed(err.message))
  }
};

export const requestLogout = () => async (dispatch: Dispatch<any>) => {
  try {
    const request = axiosHelper.createRequest({
      method: 'POST',
      url: '/v1/auth/logout',
      timeout: 100000,
      withCredentials: true
    })
    await axiosHelper.runRequest(request)
      .then(() => dispatch(logoutSuccess()))
      .catch((err) => { throw new Error(err) })
  } catch (err: any) {
    return console.error({ err })
  }
}

export default () => ({ requestLogin, requestLogout })
