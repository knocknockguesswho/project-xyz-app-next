import React from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useAppSelector } from 'helpers/redux-helper'
import { IReducers } from 'Redux/reducers'

const LoginPageTemplate = dynamic(() => import('Components/templates/login-page'))

const LoginPage = () => {
  const router = useRouter()
  const isLogin = useAppSelector((state: IReducers) => state.authReducer.isLogin)
  React.useEffect(() => {
    if (isLogin) router.replace('/', undefined, { shallow: true })
  }, [isLogin]);
  return !isLogin ? (
    <div id='home-page'>
      <LoginPageTemplate />
    </div>
  ) : <></>
}

export default LoginPage