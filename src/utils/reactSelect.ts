import { StylesConfig } from 'react-select';

type IsMulti = boolean;

type ISelectGeneric<T> = T;

export const selectStyle: StylesConfig<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ISelectGeneric<any>,
  IsMulti
> = {
  option: (provided, state) => ({
    ...provided,
    padding: 18,
    color: state.isSelected ? '#333' : '#333',
    backgroundColor: state.isSelected ? '#eaeaea' : '#F6F8FC',
    borderBottom: '0.5px solid #e7e7e7',
    '&:hover': {
      backgroundColor: state.isFocused ? '#eaeaea' : '#f6f6f6',
    },
    transition: 'background-color 0.2s',
    cursor: 'pointer',
    fontSize: 14,
  }),
  control: (base, state) => ({
    ...base,
    background: !state.isDisabled ? '#F6F8FC' : '#d9d9d8',
    color: '#a5a5a5',
    height: '100%',
    minHeight: 50,
    width: '100%',
    minWidth: 272,
    paddingLeft: 16,
    fontSize: 14,
    borderRadius: 8,
    cursor: 'pointer',
    border: 'none',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#eaeaea',
    },
  }),
  menu: base => ({
    ...base,
    boxShadow: 'none',
    borderRadius: 8,
    border: '0.1px solid rgba(0, 0, 0, 0.05)',
  }),
  menuList: base => ({
    ...base,
    borderRadius: 8,
    padding: 0,
  }),
  placeholder: base => ({
    ...base,
    color: '#333',
  }),
  singleValue: provided => ({
    ...provided,
    color: '#333',
  }),
  dropdownIndicator: base => ({
    ...base,
    color: '#B7B4BB',
    paddingRight: 16,
    svg: {
      width: 24,
      height: 24,
      strokeWidth: 0.1,
    },
  }),
};
