import React from 'react';

export interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  rightButton?: React.ReactElement;
  withShowButton?: boolean;
}
const Input = (props: IProps) => {
  const { label, rightButton, ...args } = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const inputRef: React.LegacyRef<HTMLInputElement> = React.useRef(null);
  const [isFocus, setIsFocus] = React.useState(false);
  return (
    <div className='w-full flex flex-col relative'>
      <label
        htmlFor={props.id}
        className={[
          'px-1 py-px absolute bg-white text-blue left-1',
          isFocus || (!!inputRef.current && inputRef.current.value.length > 0)
            ? 'top-0 -translate-y-[14px] opacity-100 transition-all duration-300'
            : 'top-1/2 -translate-y-1/2 opacity-0 -z-10',
          args['aria-errormessage'] ? 'text-red-500' : '',
        ].join(' ').trim()}>
        {label}
      </label>
      <React.Fragment>
        <input
          {...args}
          ref={inputRef}
          placeholder={isFocus ? '' : props.placeholder}
          className={['w-full p-2 border rounded-sm', args['aria-errormessage'] ? 'border-red-500 focus:border-red-500' : '', props.className].join(' ').trim()}
          onFocus={(e) => {
            props.onFocus && props.onFocus(e);
            setIsFocus(true);
          }}
          onBlur={(e) => {
            props.onBlur && props.onBlur(e);
            setIsFocus(false);
          }}
        />
        <div className='absolute right-2 top-1/2 -translate-y-1/2'>
          {rightButton}
        </div>
      </React.Fragment>
      {args['aria-errormessage'] && <span className='text-xs text-red-500 m-1'>{args['aria-errormessage']}</span>}
    </div>
  );
};

export default Input;
