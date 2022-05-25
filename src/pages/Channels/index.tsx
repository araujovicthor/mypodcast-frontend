import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';
import { ModalCreateChannel } from './ModalCreateChannel';

import {
  Container,
  Content,
  HeaderChannels,
  OptionsList,
  OptionItem,
} from './styles';

import api from '../../services/api';
import { FiPlus } from 'react-icons/fi';

export interface IChannel {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  avatarUrl?: string | null;
}

const Channels: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [channels, setChannels] = useState<IChannel[] | null>(null);
  const [showModalCreateChannel, setShowModalCreateChannel] = useState(false);

  useEffect(() => {
    const categoryId = new URLSearchParams(location?.search).get('categoryId');

    api
      .get('/channels', { params: { categoryId } })
      .then(response => setChannels(response.data))
      .catch(() => alert('Não foi possível carregar canais'));
  }, [location?.search]);

  const navigateToChannel = useCallback(
    (id: string) => {
      navigate(`/canais/${id}`);
    },
    [navigate],
  );

  const handleAddChannel = useCallback(
    (channel: IChannel) => {
      if (channels) setChannels([...channels, channel]);
    },
    [channels],
  );

  return (
    <Container>
      <Content>
        <HeaderChannels>
          <h1>Canais</h1>
          <button type="button" onClick={() => setShowModalCreateChannel(true)}>
            <FiPlus />
          </button>
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
        </OptionsList>
      </Content>

      <Modal
        show={showModalCreateChannel}
        enableButtons={false}
        onClose={() => setShowModalCreateChannel(false)}
      >
        <ModalCreateChannel
          handleAddChannel={handleAddChannel}
          setShowModalCreateChannel={setShowModalCreateChannel}
        />
      </Modal>
    </Container>
  );
};

export default Channels;
