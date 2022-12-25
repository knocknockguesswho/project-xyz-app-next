import { combineReducers } from 'redux';
import loginReducer, { ILoginReducer } from './login-reducer';
import refreshTokenReducer, { IRefreshTokenReducer } from './refresh-token-reducer';

export interface IReducers {
  loginReducer: ILoginReducer,
  refreshTokenReducer: IRefreshTokenReducer,
}

const rootReducer = combineReducers({ loginReducer, refreshTokenReducer });

export default rootReducer;
