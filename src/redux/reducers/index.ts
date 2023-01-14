import { combineReducers } from 'redux';
import authReducer, { IAuthReducer } from './auth-reducer';

export interface IReducers {
  authReducer: IAuthReducer
}

const rootReducer = combineReducers({ authReducer });

export default rootReducer;
