import React from 'react'
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from 'helpers/redux-helper';
import { requestLogout } from 'Redux/actions/login-action';
import { IReducers } from 'Redux/reducers';

const HomePage = () => {
  const dispatch = useAppDispatch()
  const loginData = useAppSelector((state: IReducers) => state.authReducer)// TODO: need to move to header
  return (
    <div className='flex flex-col space-y-8'>
      <span>HomePage</span>
      <div className='flex flex-row items-center space-x-4'>
        {/*TODO: need to move to header*/}
        {loginData.isLogin
          ? <>
            <button onClick={() => dispatch(requestLogout())}>
              Logout
            </button>
          </>
          : <>
            <Link href='/login'>
              Login
            </Link>
          </>
        }
      </div>
      <div>list</div>
    </div>
  )
}

export default HomePage