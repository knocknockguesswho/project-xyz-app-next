import React from 'react'
import Link, { LinkProps } from 'next/link'

type TAnchorVariant = 'text' | 'contained' | 'outlined'
export interface IProps extends LinkProps { variant: TAnchorVariant; children?: React.ReactNode; id?: string; className?: string; }
const Anchor = (props: IProps) => {
  const { variant, children, className, ...args } = props;
  const memoizedStyle = React.useMemo(() => {
    let style
    switch (variant) {
      case 'text':
        style = 'text-blue'
        break;
      case 'contained':
        style = 'bg-blue text-white'
        break;
      case 'outlined':
        style = 'border border-blue text-blue'
        break;
    }
    return style
  }, [variant])
  return (
    <Link
      {...args}
      className={[
        'w-auto text-center px-4 py-2 text-base rounded hover:opacity-90 active:scale-[.99] transition-all duration-75',
        memoizedStyle,
        props.className
      ].join(' ').trim()}
    >
      {children}
    </Link>
  )
}

export default React.memo(Anchor)