import { IReduxActionResponse } from 'helpers/redux-helper';
import { Reducer } from 'redux';
import { LOGIN_ACTIONS, LOGOUT_ACTIONS } from 'Redux/actions/login-action';

export interface ILoginReducer {
  isLogin: boolean;
  isLoading?: boolean;
  accessToken?: string;
  refreshToken?: string;
  message?: string;
}

const initialState: ILoginReducer = {
  isLogin: false
};

const loginReducer: Reducer = (state = initialState, action: IReduxActionResponse): ILoginReducer => {
  // TODO:important! need to hide refreshToken
  switch (action.type) {
    case LOGIN_ACTIONS.LOADING:
      return { isLoading: true, isLogin: false };
    case LOGIN_ACTIONS.SUCCESS:
      return { accessToken: action.data.access_token, refreshToken: action.data.refresh_token, isLoading: false, isLogin: true };
    case LOGIN_ACTIONS.FAIL:
      return { isLoading: false, isLogin: false, message: action.message };
    case LOGOUT_ACTIONS.LOADING:
      return { isLoading: true, isLogin: true };
    case LOGOUT_ACTIONS.SUCCESS:
      return { isLoading: false, isLogin: false };
    case LOGOUT_ACTIONS.FAIL:
      return { isLoading: false, isLogin: true, message: action.message };
    default:
      return state;
  }
};

export default loginReducer;
