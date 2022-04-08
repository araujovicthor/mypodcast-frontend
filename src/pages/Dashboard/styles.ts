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
  max-width: 660px;
  gap: 20px;
  margin-top: 20vh;
`;

export const OptionItem = styled.button`
  background-color: #F6F8FC;
  height: 140px;
  width: 200px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-family: 'Poppins';
    font-size: 16px;
    font-weight: 600;
    line-height: 36px;
    letter-spacing: 0em;
    text-align: center;
    color: #003881;
  }
`;

