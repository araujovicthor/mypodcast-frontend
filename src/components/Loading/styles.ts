import styled, { keyframes } from 'styled-components';

interface IContainerLoading {
  color: string;
}

export const spinLoadingButton = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div<IContainerLoading>`
  width: 30px;
  height: 30px;
  margin: auto;

  border-top: 3px solid ${props => props.color};
  border-right: 3px solid transparent;
  border-radius: 50%;
  animation: ${spinLoadingButton} 0.8s linear infinite;
`;
