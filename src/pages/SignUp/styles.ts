import styled from 'styled-components';


export const Container = styled.div`
  
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
  min-height: 100vh;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;  
  width: 100%;
  max-width: 350px;

  form {
    padding: 32px 0;

    button {
      margin-top: 32px;
    }
  }
`;


export const BottomOptions = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 32px;
  color: #7C7C7C;
`;
