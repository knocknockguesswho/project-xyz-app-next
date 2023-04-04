import React from 'react';

export interface IDropdownOption { id: number | string; label: string; }
export interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  selectEngagementLabel?: string;
  options: Array<IDropdownOption>;
  isLoading?: boolean;
}
const Dropdown = (props: IProps) => {
  const { selectEngagementLabel, options, isLoading, ...args } = props;
  return (
    <select
      {...args}
      placeholder='Select Country Code'
      defaultValue={selectEngagementLabel ? 'DROPDOWN_DEFAULT_VALUE' : undefined}
      className={[
        'w-full p-2 text-base cursor-pointer',
        args.className,
      ].join(' ').trim()}>
      {!!selectEngagementLabel && <option disabled value='DROPDOWN_DEFAULT_VALUE'>{selectEngagementLabel}</option>}
      {isLoading
        ? <option disabled>Loading...</option>
        : options.map((item) => {
          return (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          );
        })
      }
    </select>
  );
};

export default Dropdown;
