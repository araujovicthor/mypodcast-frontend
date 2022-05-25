import styled, { css } from 'styled-components';

interface IContainerButton {
  disabled: boolean;
  isLoading: boolean;
}

export const Container = styled.button<IContainerButton>`
  cursor: pointer;
  height: 50px;
  border-radius: 8px;
  border: 0;
  padding: 0 8px;
  width: 100%;
  outline: none;
  color: #fff;
  background: #003881;
  font-weight: bold;
  transition: background 0.2s, box-shadow 0.2s;
  font-size: 16px;

  &:hover {
    background: #080d4e;
  }

  &.back {
    &:hover {
      background: #e0e0e0;
    }
  }

  &.cancel {
    background-color: #c9291b;

    &:hover {
      background: #ef1818;
    }
  }

  ${props =>
    props.disabled &&
    css`
      background: rgba(0, 0, 0, 0.4);
      pointer-events: none;
      cursor: default;
    `}

  ${props =>
    props.isLoading &&
    css`
      pointer-events: none;
      cursor: default;
    `}
`;
