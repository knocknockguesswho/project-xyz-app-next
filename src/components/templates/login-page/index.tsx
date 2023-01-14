import React from 'react'
import LoginForm from './login-context-provider'
import LoginFormSection from './sections/login-form-section'

const LoginPageTemplate = () => {
  return (
    <div className='min-h-screen h-full bg-sky-500 flex flex-col items-center justify-center space-y-8'>
      <h1 className='text-3xl font-bold text-white'>Project XYZ</h1>
      <section aria-label='Login Form' className=' bg-white w-[400px] rounded-lg p-8 space-y-4'>
        <h2 className='text-xl font-bold'>Login</h2>
        <LoginForm>
          <LoginFormSection />
        </LoginForm>
      </section>
    </div>
  )
}

export default LoginPageTemplate