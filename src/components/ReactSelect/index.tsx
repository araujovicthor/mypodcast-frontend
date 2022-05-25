import React, { useRef, useEffect } from 'react';
import ReactSelect, { Props as SelectProps } from 'react-select';
import { useField } from '@unform/core';

import { selectStyle } from '../../utils/reactSelect';

import { Wrapper, Container } from './styles';

interface ISelectProps extends SelectProps<any> {
  name: string;
  isMulti?: false | undefined;
  label?: string;
}

const Select: React.FC<ISelectProps> = ({
  name,
  label,
  isMulti = false,
  ...rest
}) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (isMulti) {
          if (!ref.state.selectValue) {
            return [];
          }
          return ref.state.selectValue.map((option: any) => option.value);
        }
        if (!ref.state.selectValue || ref?.state?.selectValue.length < 1) {
          return undefined;
        }
        return ref.state.selectValue[0].value;
      },
    });
  }, [fieldName, isMulti, registerField]);

  return (
    <Wrapper>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <Container>
        <ReactSelect
          styles={selectStyle}
          defaultValue={defaultValue}
          ref={selectRef}
          classNamePrefix={name}
          {...rest}
        />
      </Container>

      {error && <span className="error">{error}</span>}
    </Wrapper>
  );
};
export default Select;
