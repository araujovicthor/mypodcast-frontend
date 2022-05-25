import React from 'react';

import { Container } from './styles';

interface ILoading {
  color?: string;
}

const Loading: React.FC<ILoading> = ({ color = '#fff' }) => (
  <Container
    color={color}
    data-testid="loading-animation"
    className="loading"
  />
);

export default Loading;
