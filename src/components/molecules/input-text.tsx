import React from 'react';
import Input, { IProps as IInputProps } from 'Components/atoms/input';

const InputText = (props: IInputProps) => {
  return (
    <Input {...props} />
  );
};

export default InputText;
