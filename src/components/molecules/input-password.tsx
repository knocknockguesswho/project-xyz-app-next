import React from 'react';
import Input, { IProps as IInputProps } from 'Components/atoms/input';

const InputText = (props: Omit<IInputProps, 'type'>) => {
  const [isPasswordShown, setIsPasswordShown] = React.useState(false);
  return (
    <Input
      {...props}
      className='pr-16'
      type={isPasswordShown ? 'text' : 'password'}
      enterKeyHint='done'
      rightButton={
        <button
          className={[
            'text-xs opacity-90 px-2 py-1 rounded active:scale-[.99] transition-all',
            isPasswordShown ? 'bg-blue text-white' : 'text-blue',
          ].join(' ').trim()}
          onPointerDown={(e) => {
            setIsPasswordShown((prev) => !prev);
            e.preventDefault();
            e.stopPropagation();
          }}>
          {isPasswordShown ? 'Hide' : 'Show'}
        </button>
      }
    />
  );
};

export default InputText;
