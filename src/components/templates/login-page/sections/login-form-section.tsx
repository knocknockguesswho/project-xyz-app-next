import React from 'react'
import Button from 'Components/atoms/button'
import InputPassword from 'Components/molecules/input-password';
import InputText from 'Components/molecules/input-text';
import { requestLogin } from 'Redux/actions/login-action';
import Divider from 'Components/atoms/divider';
import Anchor from 'Components/atoms/anchor';
import { LoginFormCtx } from '../login-context-provider'
import { useAppDispatch, useAppSelector } from 'helpers/redux-helper';
import { IReducers } from 'Redux/reducers';
import { useRouter } from 'next/router';

const LoginFormSection = () => {
  const { ctx, setCtx } = React.useContext(LoginFormCtx)
  const router = useRouter();
  const dispatch = useAppDispatch()
  const isLogin = useAppSelector((state: IReducers) => state.loginReducer.isLogin)

  const submitForm = React.useCallback((username?: string, password?: string) => {
    if (username && password) dispatch(requestLogin({ username, password }))
  }, [])

  React.useEffect(() => {
    if (isLogin) router.push('/')
  }, [isLogin]);

  return (
    <div className='flex flex-col space-y-4 items-center'>
      <div className='flex flex-col space-y-4' onKeyDownCapture={(e) => { if (e.key === 'Enter') submitForm(ctx.username, ctx.password) }}>
        <InputText
          id='login-username'
          name='username'
          placeholder='Username'
          label='Username'
          required={true}
          minLength={8}
          maxLength={32}
          value={ctx.username}
          onChange={(e) => setCtx((prev) => ({ ...prev, username: e.target.value }))}
          onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur() }}
        />
        <InputPassword
          id='login-password'
          name='password'
          placeholder='Password'
          label='Password'
          required={true}
          minLength={8}
          maxLength={32}
          value={ctx.password}
          onChange={(e) => setCtx((prev) => ({ ...prev, password: e.target.value }))}
          onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur() }}
        />
      </div>
      <div role='group' aria-label='Button Group' className='w-full flex flex-col space-y-4 items-center'>
        <Button
          id='login-submit'
          aria-label='Login Submit'
          name='login-submit'
          variant='primary'
          onClick={() => submitForm(ctx.username, ctx.password)}
        >
          Login
        </Button>
        <Anchor id='go-to-forgot-password' variant='text' href='/forgot-password' className='cursor-pointer text-blue text-sm'>
          Forgot Password?
        </Anchor>
        <Divider />
        <Anchor id='go-to-sign-up' variant='outlined' href='/sign-up'>
          Sign Up
        </Anchor>
      </div>
    </div>
  )
}

export default LoginFormSection