import React from 'react'
import Input, { IProps as IInputProps } from 'Components/atoms/input'

const InputPassword = (props: Omit<IInputProps, 'type'>) => {
  return (
    <Input {...props} type='text' />
  )
}

export default InputPassword