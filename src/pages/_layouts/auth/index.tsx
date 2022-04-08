import React from 'react';

import { Wrapper, Container } from './styles';

const AuthLayout: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <Container>{children}</Container>
    </Wrapper>
  );
};

export default AuthLayout;
