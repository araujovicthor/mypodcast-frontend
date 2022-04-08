import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 400px;
  padding: 0 8px;

  h1 {
    font-weight: bold;
    font-size: 3.6rem;
    color: var(--primary);
    text-align: center;
    margin-bottom: 16px;
    line-height: 120%;
  }

  h2 + h2 {
    margin-top: 8px;
  }

  h2 {
    font-style: normal;
    font-size: 1.8rem;
    line-height: 1.8rem;
    text-align: center;
    line-height: 140%;
  }

  button {
    width: 100%;
    color: var(--white);
    background-color: var(--primary);
    margin-top: 16px;

    &:hover {
      background-color: var(--primary-dark);
    }
  }
`;
