import React from 'react'

type TDividerVariant = 'normal' | 'thick'
export interface IProps extends React.HTMLAttributes<HTMLHRElement> {
  variant?: TDividerVariant
}
const Divider = (props: IProps) => {
  const { variant = 'normal', ...args } = props;
  return (
    <hr
      {...args}
      className={[
        'w-full bg-mild',
        variant === 'normal' ? 'h-px' : 'h-2'
      ].join(' ').trim()}
    />
  )
}

export default Divider