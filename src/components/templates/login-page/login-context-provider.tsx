import React from 'react'

export interface ILoginForm {
  username: string;
  password: string;
  usernameErrorMessage?: string;
  passwordErrorMessage?: string;
  submitErrorMessage?: string;
}
export interface ILoginFormCtx { ctx: ILoginForm; setCtx: React.Dispatch<React.SetStateAction<ILoginForm>>; }
export interface IProps { children?: React.ReactNode; }

const InitialLoginFormCtx: ILoginForm = {
  username: '',
  password: '',
};
export const LoginFormCtx = React.createContext<ILoginFormCtx>({ ctx: InitialLoginFormCtx, setCtx: () => (prevState: ILoginForm) => prevState });

const LoginForm = (props: IProps) => {
  const [ctx, setCtx] = React.useState<ILoginForm>(InitialLoginFormCtx);
  return (
    <LoginFormCtx.Provider value={{ ctx, setCtx }}>
      {props.children}
    </LoginFormCtx.Provider>
  );
};

export default LoginForm;