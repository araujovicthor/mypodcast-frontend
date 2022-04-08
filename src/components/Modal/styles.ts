import styled, { css } from 'styled-components';

interface IWrapperModalProps {
  display: string;
  isInnerModal: boolean;
}

export const Wrapper = styled.div<IWrapperModalProps>`
  background: rgba(0, 0, 0, 0.2);
  display: ${props => props.display};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;

  ${props =>
    props.isInnerModal &&
    css`
      border-radius: 16px;
    `};
`;

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  max-height: 100%;
`;

export const Content = styled.div`
  padding: 2rem;
  border-radius: 16px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--texts);
  background: var(--white);
  overflow: auto;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 8px;
`;

export const ContentModalConfirmation = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
  width: 100%;
  min-width: 300px;
  max-width: 400px;

  h2 {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--primary);
    line-height: 130%;
  }

  h3 {
    margin-top: 8px;
    font-size: 1.6rem;
    line-height: 150%;

    strong {
      font-weight: bold;
      color: var(--primary);
    }
  }
`;
