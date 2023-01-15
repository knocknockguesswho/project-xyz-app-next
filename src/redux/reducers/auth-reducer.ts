import { IReduxActionResponse } from 'helpers/redux-helper';
import { Reducer } from 'redux';
import { LOGIN_ACTIONS, LOGOUT_ACTIONS } from 'Redux/actions/login-action';

export interface IUserData {
  age: number;
  avatar?: string | null;
  country_code: string;
  created_at: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  username: string;
}

export interface IAuthReducer {
  isLogin: boolean;
  isLoading?: boolean;
  accessToken?: string;
  message?: string;
  userData?: IUserData;
}

const initialState: IAuthReducer = {
  isLogin: false
};

const authReducer: Reducer = (state: IAuthReducer = initialState, action: IReduxActionResponse): IAuthReducer => {
  switch (action.type) {
    case LOGIN_ACTIONS.LOADING:
      return { isLoading: true, isLogin: false };
    case LOGIN_ACTIONS.FAIL:
      return { isLoading: false, isLogin: false, message: action.message };
    case LOGIN_ACTIONS.SUCCESS:
      return { accessToken: action.data.access_token, userData: action.data.userData, isLoading: false, isLogin: true };
    case LOGOUT_ACTIONS.SUCCESS:
      return initialState
    default:
      return state;
  }
};

export default authReducer;
