import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 660px;
  gap: 20px;
  margin-top: 10vh;

  > h1 {
    font-family: 'Poppins';
    font-size: 24px;
    font-weight: 600;
    line-height: 36px;
    letter-spacing: 0em;
    text-align: center;
    color: #003881;
  }

  > button {
    max-width: 300px;
    font-size: 16px;
    margin-left: auto;
  }
`;

export const OptionsList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const OptionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #003881;
  height: 56px;

  & + &{
    border-top: 1px solid #E7E7E7;
  }
`;

export const OptionItemRight = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  button {
    height: 32px;
    width: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    
    svg {
      width: 16px;
      height: 16px;
      color: #003881;
    }
  }
`;

