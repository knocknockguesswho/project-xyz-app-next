import React from 'react';
import Button from 'Components/atoms/button';
import InputPassword from 'Components/molecules/input-password';
import InputText from 'Components/molecules/input-text';
import Anchor from 'Components/atoms/anchor';
import Dropdown, { IDropdownOption } from 'Components/atoms/dropdown';
import { SignupFormCtx } from '../signup-context-provider';
import { useAppDispatch, useAppSelector } from 'helpers/redux-helper';
import { IReducers } from 'Redux/reducers';
// import { useRouter } from 'next/router';
import { requestCountryCode } from 'Redux/actions/country-code-action';

const SignupFormSection = () => {
  // const router = useRouter();
  const dispatch = useAppDispatch();
  const { ctx, setCtx } = React.useContext(SignupFormCtx);
  const submitForm = React.useCallback((username?: string, password?: string) => {
    console.log({ username, password });
  }, []);

  return (
    <div className='flex flex-col space-y-6 items-center'>
      <div className='flex flex-col space-y-6' onKeyDownCapture={(e) => { if (e.key === 'Enter') submitForm(ctx.username, ctx.password); }}>
        <div className='flex flex-row space-x-4 relative'>
          <InputText
            id='signup-firstName'
            name='firstName'
            placeholder='First name'
            label='First name'
            required={true}
            minLength={8}
            maxLength={32}
            value={ctx.firstName}
            onChange={(e) => setCtx((prev) => ({ ...prev, firstName: e.target.value }))}
            onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur(); }}
          />
          <InputText
            id='signup-lastName'
            name='lastName'
            placeholder='Last name'
            label='Last name'
            required={true}
            minLength={8}
            maxLength={32}
            value={ctx.lastName}
            onChange={(e) => setCtx((prev) => ({ ...prev, lastName: e.target.value }))}
            onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur(); }}
          />
        </div>
        <InputText
          id='signup-username'
          name='signup-username'
          placeholder='Username'
          label='Username'
          required={true}
          minLength={8}
          maxLength={32}
          value={ctx.username}
          onChange={(e) => setCtx((prev) => ({ ...prev, username: e.target.value }))}
          onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur(); }}
        />
        <InputText
          id='signup-email'
          name='signup-email'
          placeholder='Email'
          label='Email'
          type='email'
          required={true}
          minLength={8}
          maxLength={32}
          value={ctx.email}
          onChange={(e) => setCtx((prev) => ({ ...prev, email: e.target.value }))}
          onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur(); }}
        />
        <InputPassword
          id='signup-password'
          name='signup-password'
          placeholder='Password'
          label='Password'
          required={true}
          minLength={8}
          maxLength={32}
          value={ctx.password}
          onChange={(e) => setCtx((prev) => ({ ...prev, password: e.target.value }))}
          onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur(); }}
        />
        <InputPassword
          id='signup-repeat-password'
          name='signup-repeat-password'
          placeholder='Repeat Password'
          label='Repeat Password'
          required={true}
          minLength={8}
          maxLength={32}
          value={ctx.repeatPassword}
          onChange={(e) => setCtx((prev) => ({ ...prev, repeatPassword: e.target.value }))}
          onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur(); }}
        />
        {/* TODO: need to create database containing list of country codes */}
        {/* <div className='w-full relative'>
          <Dropdown
            options={countryCodeOptions}
            selectEngagementLabel='Select Country'
            isLoading={countryCodeReducer.isLoading}
            onClick={() => {
              if (countryCodeOptions.length === 0) {
                dispatch(requestCountryCode());
              }
            }}
            onChange={(e) => console.log(e.target.value)}
          />
        </div> */}
      </div>
      <div role='group' aria-label='Button Group' className='w-full flex flex-col space-y-2 justify-between items-center'>
        <Button
          id='signup-submit'
          aria-label='Signup Submit'
          name='signup-submit'
          variant='primary'
          onClick={() => submitForm(ctx.username, ctx.password)}>
          Sign Up
        </Button>
        <Anchor id='signin-' href={'/login'} variant='text'>
          Sign In instead
        </Anchor>
      </div>
    </div>
  );
};

export default SignupFormSection;
