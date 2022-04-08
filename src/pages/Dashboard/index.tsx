import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Content, OptionItem } from './styles';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate],
  );

  const options = [
    {
      id: '1',
      name: 'Categorias',
      path: '/categorias',
    },
    {
      id: '2',
      name: 'Canais',
      path: '/canais',
    },
    {
      id: '3',
      name: 'Episódios',
      path: '/episodios',
    },
    {
      id: '4',
      name: 'Favoritos',
      path: '/favoritos',
    },
    {
      id: '5',
      name: 'Usuários',
      path: '/usuarios',
    },
  ];

  return (
    <Container>
      <Content>
        {options.map(option => (
          <OptionItem
            key={option.id}
            type="button"
            onClick={() => handleNavigate(option.path)}
          >
            <span>{option.name}</span>
          </OptionItem>
        ))}
      </Content>
    </Container>
  );
};

export default Dashboard;
