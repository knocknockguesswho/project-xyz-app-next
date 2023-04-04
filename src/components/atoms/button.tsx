import React from 'react';

type TButtonVariant = 'primary' | 'secondary'
export interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant: TButtonVariant }
const Button = (props: IProps) => {
  const { variant, ...args } = props;
  return (
    <button
      {...args}
      type='button'
      className={[
        'px-4 py-2 text-base w-full rounded-sm hover:opacity-90 active:scale-[.99] transition-all duration-75',
        variant === 'primary' ? 'bg-blue text-white' : 'border border-blue text-blue',
        props.className,
      ].join(' ').trim()}>
      {props.children}
    </button>
  );
};

export default Button;
