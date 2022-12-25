import { IReduxActionResponse } from 'helpers/redux-helper';
import { Reducer } from 'redux';
import { REFRESH_TOKEN } from 'Redux/actions/refresh-token-action';

export interface IRefreshTokenReducer {
  isSuccess: boolean;
  isLoading?: boolean;
  accessToken?: string;
  refreshToken?: string;
  message?: string;
}

const initialState: IRefreshTokenReducer = {
  isSuccess: false
};

const loginReducer: Reducer = (state = initialState, action: IReduxActionResponse): IRefreshTokenReducer => {
  switch (action.type) {
    case REFRESH_TOKEN.LOADING:
      return { isLoading: true, isSuccess: false };
    case REFRESH_TOKEN.SUCCESS:
      return { refreshToken: action.data.refresh_token, accessToken: action.data.access_token, isLoading: false, isSuccess: true };
    case REFRESH_TOKEN.FAIL:
      return { isLoading: false, isSuccess: false, message: action.message };
    default:
      return state;
  }
};

export default loginReducer;
