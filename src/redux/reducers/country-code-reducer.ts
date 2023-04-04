import { IReduxActionResponse } from 'helpers/redux-helper';
import { Reducer } from 'redux';
import { COUNTRY_CODE_ACTIONS } from 'Redux/actions/country-code-action';

export interface ICountryCode {
  [code: string]: {
    country: 'string',
    region: 'string'
  }
}

export interface ICountryCodeReducer {
  isLoading?: boolean;
  countryCode?: ICountryCode;
  message?: string;
}

export interface ICountryCodeData extends Pick<ICountryCodeReducer, 'countryCode'> { }

const initialState: ICountryCodeReducer = {
  isLoading: true,
};

const countryCodeReducer: Reducer = (state: ICountryCodeReducer = initialState, action: IReduxActionResponse<ICountryCodeData>): ICountryCodeReducer => {
  switch (action.type) {
    case COUNTRY_CODE_ACTIONS.LOADING:
      return { isLoading: true };
    case COUNTRY_CODE_ACTIONS.FAIL:
      return { isLoading: false, message: action.message };
    case COUNTRY_CODE_ACTIONS.SUCCESS:
      return { isLoading: false, countryCode: action.data?.countryCode };
    default:
      return state;
  }
};

export default countryCodeReducer;
