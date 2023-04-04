import { combineReducers } from 'redux';
import authReducer, { IAuthReducer } from './auth-reducer';
import countryCodeReducer, { ICountryCodeReducer } from './country-code-reducer';

export interface IReducers {
  authReducer: IAuthReducer,
  countryCodeReducer: ICountryCodeReducer,
}

const rootReducer = combineReducers({ authReducer, countryCodeReducer });

export default rootReducer;
