import React from 'react'
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from 'helpers/redux-helper';
import { requestLogout } from 'Redux/actions/login-action';
import { IReducers } from 'Redux/reducers';

const HomePage = () => {
  const dispatch = useAppDispatch()
  const isLogin = useAppSelector((state: IReducers) => state.loginReducer.isLogin)
  return (
    <div className='flex flex-col space-y-8'>
      <span>HomePage</span>
      <div className='flex flex-row items-center space-x-4'>
        <Link href='/login'>
          Login
        </Link>
        {isLogin &&
          <button onClick={() => dispatch(requestLogout())}>
            Logout
          </button>
        }
      </div>
    </div>
  )
}

export default HomePage