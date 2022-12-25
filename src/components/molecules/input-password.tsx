import React from 'react'
import Input, { IProps as IInputProps } from 'Components/atoms/input'

const InputText = (props: Omit<IInputProps, 'type'>) => {
  const [isPasswordShown, setIsPasswordShown] = React.useState(false)
  return (
    <Input
      {...props}
      type={isPasswordShown ? 'text' : 'password'}
      rightButton={
        <button
          className={[
            'text-xs opacity-90 px-2 py-1 rounded active:scale-[.99] transition-all',
            isPasswordShown ? 'bg-blue text-white' : 'text-blue hover:bg-blue/50 hover:text-white'
          ].join(' ').trim()}
          onClick={(e) => {
            setIsPasswordShown((prev) => !prev);
            e.preventDefault()
            e.stopPropagation()
          }}>
          Show
        </button>
      }
    />
  )
}

export default InputText