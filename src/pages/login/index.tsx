import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useAppSelector } from 'helpers/redux-helper';
import { IReducers } from 'Redux/reducers';

const LoginPageTemplate = dynamic(() => import('Components/templates/login-page'));

const LoginPage = () => {
  const router = useRouter();
  const loginData = useAppSelector((state: IReducers) => state.authReducer);
  React.useEffect(() => {
    if (loginData.isLogin) router.replace('/' + loginData.userData?.username, undefined, { shallow: true });
  }, [loginData.isLogin]);
  return !loginData.isLogin ? (
    <div id='home-page'>
      <LoginPageTemplate />
    </div>
  ) : <></>;
};

export default LoginPage;
