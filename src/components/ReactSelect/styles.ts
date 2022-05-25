import styled from 'styled-components';

export const Wrapper = styled.div`
  text-align: left;

  label {
    font-weight: 600;
    font-size: 1.2rem;
  }

  span.error {
    font-style: normal;
    font-weight: 400;
    font-size: 1rem;
    display: inline-block;
    margin-top: 8px;
    color: var(--negative);
  }
`;

export const Container = styled.div`
  margin-top: 16px;
`;
