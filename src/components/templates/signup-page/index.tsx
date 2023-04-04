import React from 'react';
import SignupForm from './signup-context-provider';
import SignupFormSection from './sections/signup-form-section';

const SignupPageTemplate = () => {
  return (
    <div className='min-h-screen h-full bg-sky-500 flex flex-col items-center justify-center space-y-8'>
      <h1 className='text-3xl font-bold text-white'>Project XYZ</h1>
      <section aria-label='Signup Form' className=' bg-white w-full max-w-[400px] rounded-lg p-8 space-y-6'>
        <h2 className='text-xl text-blue font-bold'>Signup</h2>
        <SignupForm>
          <SignupFormSection />
        </SignupForm>
      </section>
    </div>
  );
};

export default SignupPageTemplate;
