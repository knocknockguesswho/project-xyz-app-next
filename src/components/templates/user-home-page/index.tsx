import { useAppDispatch, useAppSelector } from 'helpers/redux-helper';
import React from 'react';
import { requestLogout } from 'Redux/actions/login-action';
import { IReducers } from 'Redux/reducers';
import { IAuthReducer } from 'Redux/reducers/auth-reducer';

export interface IProps { userData: IAuthReducer['userData'] }

const UserHomePageTemplate = (props: IProps) => {
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state: IReducers) => state.authReducer.isLogin);
  return props.userData ? (
    <div className='flex flex-col space-y-4'>
      <h1>user home page <strong>{props.userData.username}</strong></h1>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(props.userData).map((data) => {
            return (
              <tr key={data[0]}>
                <td>{data[0]}</td>
                <td>{data[1] ?? 'nil'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {isLogin &&
        <div>
          <button onClick={() => dispatch(requestLogout())}>
            Logout
          </button>
        </div>
      }
    </div>
  ) : <></>;
};

export default UserHomePageTemplate;
