import { Dispatch } from 'redux';
import { IReduxActionResponse } from 'helpers/redux-helper';
import { axiosHelper } from 'helpers/axios-helper';
import { ICountryCodeData } from 'Redux/reducers/country-code-reducer';

export enum COUNTRY_CODE_ACTIONS {
  LOADING = 'LOGIN_LOADING',
  SUCCESS = 'LOGIN_SUCCESS',
  FAIL = 'LOGIN_FAIL'
}

export const countryCodeBegin = (): IReduxActionResponse<undefined> => ({
  type: COUNTRY_CODE_ACTIONS.LOADING,
});

export const countryCodeSuccess = (data: ICountryCodeData): IReduxActionResponse<ICountryCodeData> => ({
  type: COUNTRY_CODE_ACTIONS.SUCCESS,
  data,
});

export const countryCodeFailed = (message: string): IReduxActionResponse<undefined> => ({
  type: COUNTRY_CODE_ACTIONS.FAIL,
  message,
});

export const requestCountryCode = () => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(countryCodeBegin());
    const request = axiosHelper.createRequest({
      method: 'GET',
      url: '/v1/external/country-code',
      timeout: 100000,
      withCredentials: true,
    });
    await axiosHelper.runRequest(request)
      .then((res) => dispatch(countryCodeSuccess({ countryCode: res.data.data })))
      .catch((err) => { throw new Error(err.response.data.message); });
  } catch (err: any) {
    console.error(err);
    dispatch(countryCodeFailed(err.message));
  }
};

export default () => ({ requestCountryCode });
