import React from 'react';

export interface ISignupForm {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  firstNameErrorMessage?: string;
  lastNameErrorMessage?: string;
  usernameErrorMessage?: string;
  passwordErrorMessage?: string;
  repeatPasswordErrorMessage?: string;
  submitErrorMessage?: string;
}
export interface ISignupFormCtx { ctx: ISignupForm; setCtx: React.Dispatch<React.SetStateAction<ISignupForm>>; }
export interface IProps { children?: React.ReactNode; }

const InitialSignupFormCtx: ISignupForm = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  repeatPassword: '',
};
export const SignupFormCtx = React.createContext<ISignupFormCtx>({ ctx: InitialSignupFormCtx, setCtx: () => (prevState: ISignupForm) => prevState });

const SignupForm = (props: IProps) => {
  const [ctx, setCtx] = React.useState<ISignupForm>(InitialSignupFormCtx);
  return (
    <SignupFormCtx.Provider value={{ ctx, setCtx }}>
      {props.children}
    </SignupFormCtx.Provider>
  );
};

export default SignupForm;
