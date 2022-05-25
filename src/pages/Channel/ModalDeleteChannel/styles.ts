import styled from 'styled-components';

export const Container = styled.div`
  width: 70vw;

  h1 {
    font-size: 20px;
    font-weight: semibold;
    color: var(--titles);
    margin-bottom: 16px;
    width: 100%;
    text-align: center;
  }
  p {
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%;
    margin-top: 16px;
  }

  @media (min-width: 720px) {
    padding: 0;
    width: 400px;
  }
`;

export const Bottom = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;

  .back {
    background-color: #e4e4eb;
    color: #033a40;
  }
`;
