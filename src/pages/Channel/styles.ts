import styled, { css } from 'styled-components';
import { spinLoadingButton } from '../../components/Loading/styles';

interface IAvatarInputProps {
  loading: number;
}

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 96px;
`;

export const HeaderChannel = styled.div`
  display: flex;
  gap: 8px;
`;

export const HeaderChannelRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  span {
    line-height: 20px;
  }
`;

export const HeaderChannelTitle = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  font-family: Poppins;

  h1 {
    font-size: 24px;
    font-weight: 600;
    line-height: 36px;
    letter-spacing: 0em;
    text-align: left;
  }

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

export const AvatarInput = styled.div<IAvatarInputProps>`
  position: relative;
  height: 140px;
  min-width: 200px;
  overflow: hidden;

  img {
    background-color: rgba(255, 255, 255, 0.05);
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 8px;
  }

  label {
    position: absolute;
    width: 32px;
    height: 32px;
    background: var(--primary);
    border-radius: 50%;
    right: 0;
    bottom: 0;
    border: 0;

    transition: background-color 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    input {
      display: none;
    }

    svg {
      width: 18px;
      height: 18px;
      color: rgba(255, 255, 255, 0.8);
    }

    &:hover {
      background: var(--primary-dark);
    }
  }

  ${props =>
    props.loading &&
    css`
      label {
        pointer-events: none;
        background: rgba(255, 255, 255, 0.4);

        svg {
          color: var(--texts);
          color: rgba(0, 0, 0, 0.4);
          animation: ${spinLoadingButton} 2s linear infinite;
        }
      }
    `}
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
  padding: 30px 0;

  & + & {
    border-top: 1px solid #e7e7e7;
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
