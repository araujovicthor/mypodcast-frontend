import styled from 'styled-components';

export const Container = styled.div`
  height: 180px;
  width: 100%;
  background-color: #f6f8fc;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1280px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > button {
    background: transparent;
  }

  img {
    height: 64px;
    width: auto;
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;

  span {
    font-family: 'Poppins';
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0em;
    text-align: left;
  }

  button {
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 24px;
      height: 24px;
      color: #7c7c7c;
    }
  }
`;
