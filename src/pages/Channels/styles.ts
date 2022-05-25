import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1280px;
  gap: 20px;
  margin-top: 32px;
  flex-direction: column;
`;

export const HeaderChannels = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  button {
    height: 32px;
    width: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      height: 24px;
      width: 24px;
      stroke-width: 3px;
    }
  }
`;

export const OptionsList = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 32px;
`;

export const OptionItem = styled.button`
  background-color: #f6f8fc;
  height: 140px;
  width: 200px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    filter: blur(2px);
  }

  span {
    font-family: 'Poppins';
    font-size: 16px;
    font-weight: 600;
    line-height: 36px;
    letter-spacing: 0em;
    text-align: center;
    color: #003881;
    position: absolute;
  }
`;
