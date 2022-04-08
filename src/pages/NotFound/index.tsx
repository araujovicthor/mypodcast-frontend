import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/Button';

import { Container, Content } from './styles';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateToHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <Container>
      <Content>
        <h1>404</h1>
        <h2>Url inválida</h2>

        <Button type="button" onClick={handleNavigateToHome}>
          Voltar ao início
        </Button>
      </Content>
    </Container>
  );
};

export default NotFound;
