import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  & + & {
    margin-top : 16px;
  }

  input {
    flex: 1;
    width: 100%;
    border: 0;
    margin-right: 8px;
    outline: none;
    font-size: 16px;
    padding: 16px;
    background: var(--card);

    &::placeholder {
      color: var(--texts);
      background: transparent;
      font-size: 1rem;
    }
  }

  span.error {
    color: var(--negative);
  }

`;
