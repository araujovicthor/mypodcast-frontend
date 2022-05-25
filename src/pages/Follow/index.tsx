import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  Container,
  Content,
  HeaderChannels,
  OptionsList,
  OptionItem,
} from './styles';

import api from '../../services/api';

export interface IChannel {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  avatarUrl?: string | null;
}

const Follow: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [channels, setChannels] = useState<IChannel[] | null>(null);

  useEffect(() => {
    api
      .get('/channels', { params: { favorites: true } })
      .then(response => setChannels(response.data))
      .catch(() => alert('Não foi possível carregar canais'));
  }, [location?.search]);

  const navigateToChannel = useCallback(
    (id: string) => {
      navigate(`/canais/${id}`);
    },
    [navigate],
  );

  return (
    <Container>
      <Content>
        <HeaderChannels>
          <h1>Canais Favoritos</h1>
        </HeaderChannels>

        <OptionsList>
          {channels &&
            channels.map(channel => (
              <OptionItem
                key={channel.id}
                type="button"
                onClick={() => navigateToChannel(channel.id)}
              >
                {channel.avatarUrl && (
                  <img src={channel.avatarUrl} alt={channel.name}></img>
                )}
                <span>{channel.name}</span>
              </OptionItem>
            ))}

          {channels?.length === 0 && (
            <span>Usuário não se inscreveu em nenhum canal</span>
          )}
        </OptionsList>
      </Content>
    </Container>
  );
};

export default Follow;
