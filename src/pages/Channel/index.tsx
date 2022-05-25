import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { FiCamera, FiEdit, FiHeart, FiRotateCw, FiTrash } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../../components/Modal';
import Button from '../../components/Button';

import {
  Container,
  HeaderChannel,
  HeaderChannelRight,
  Content,
  OptionsList,
  OptionItem,
  OptionItemRight,
  AvatarInput,
  HeaderChannelTitle,
} from './styles';

import { ModalCreatePodcast } from './ModalCreatePodcast';
import { ModalEditPodcast } from './ModalEditPodcast';
import { ModalDeletePodcast } from './ModalDeletePodcast';

import api from '../../services/api';
import { ModalEditChannel } from './ModalEditChannel';
import { ModalDeleteChannel } from './ModalDeleteChannel';
import { getUiAvatarUrl } from '../../utils/uiAvatars';

export interface IPodcast {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  fileUrl?: string;
}

export interface IChannel {
  id: string;
  name: string;
  description: string;
  podcasts: IPodcast[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  avatarUrl?: string;
  userFollow: boolean;
}

const Categories: React.FC = () => {
  const navigate = useNavigate();

  const [channel, setChannel] = useState<IChannel | undefined>(undefined);
  const [loadingImage, setLoadingImage] = useState(false);

  const [dataShowModalEditChannel, setDataShowModalEditChannel] =
    useState<IChannel | null>(null);
  const [dataShowModalDeleteChannel, setDataShowModalDeleteChannel] =
    useState<IChannel | null>(null);
  const [showModalCreatePodcast, setShowModalCreatePodcast] = useState(false);
  const [dataShowModalEditPodcast, setDataShowModalEditPodcast] =
    useState<IPodcast | null>(null);
  const [dataShowModalDeletePodcast, setDataShowModalDeletePodcast] =
    useState<IPodcast | null>(null);

  const { id } = useParams();

  useEffect(() => {
    api
      .get(`/channels/${id}`)
      .then(response => setChannel(response.data))
      .catch(() => alert('Não foi possível carregar o canal'));
  }, [id]);

  const handleAddPodcast = useCallback(
    (podcast: IPodcast) => {
      if (channel)
        setChannel({ ...channel, podcasts: [...channel.podcasts, podcast] });
    },
    [channel],
  );

  const handleEditPodcast = useCallback(
    (podcast: IPodcast) => {
      if (channel) {
        const editPodcast = channel.podcasts.map(item => {
          if (item.id === podcast.id) return podcast;
          return item;
        });
        setChannel({ ...channel, podcasts: editPodcast });
      }
    },
    [channel],
  );

  const handleEditChannel = useCallback((channel: IChannel) => {
    setChannel(channel);
  }, []);

  const handleRemoveChannel = useCallback(() => {
    navigate('/canais');
  }, [navigate]);

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setLoadingImage(true);

      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        api
          .patch(`/channels/${channel?.id}/avatar`, data)
          .then(response => {
            handleEditChannel(response.data);
          })
          .catch(() => {
            alert(
              'Insira uma imagem no formato png, jpg ou jpeg e tente novamente',
            );
          })
          .finally(() => {
            setLoadingImage(false);
          });
      }
    },
    [channel?.id, handleEditChannel],
  );

  const handleFileChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>, podcast: IPodcast) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('file', e.target.files[0]);

        api
          .patch<IPodcast>(`/podcasts/${podcast.id}/file`, data)
          .then(response => {
            handleEditPodcast(response.data);
          })
          .catch(() => {
            alert('Erro ao enviar arquivo');
          });
      }
    },
    [handleEditPodcast],
  );

  const handleRemovePodcast = useCallback(
    (podcast: IPodcast) => {
      if (channel) {
        const removedPodcasts = channel.podcasts.filter(item => {
          return item.id !== podcast.id;
        });
        setChannel({ ...channel, podcasts: removedPodcasts });
      }
    },
    [channel],
  );

  const handleFollow = useCallback(
    async (channel: IChannel) => {
      const response = await api.put(`/channels/${channel.id}/follow`);

      if (response?.data) {
        handleEditChannel(response.data);
      }
    },
    [handleEditChannel],
  );

  return (
    <Container>
      {channel && (
        <Content>
          <HeaderChannel>
            <AvatarInput loading={loadingImage ? 1 : 0}>
              <img
                src={channel.avatarUrl || getUiAvatarUrl(channel.name)}
                alt={channel.name}
              />

              <label htmlFor="avatar">
                {!loadingImage ? <FiCamera /> : <FiRotateCw />}
                <input type="file" id="avatar" onChange={handleAvatarChange} />
              </label>
            </AvatarInput>

            <HeaderChannelRight>
              <HeaderChannelTitle>
                <h1>{channel.name}</h1>
                <button
                  type="button"
                  onClick={() => setDataShowModalEditChannel(channel)}
                >
                  <FiEdit />
                </button>
                <button
                  type="button"
                  onClick={() => setDataShowModalDeleteChannel(channel)}
                >
                  <FiTrash />
                </button>

                <button type="button" onClick={() => handleFollow(channel)}>
                  {channel.userFollow ? (
                    <FiHeart fill="#003881" />
                  ) : (
                    <FiHeart />
                  )}
                </button>
              </HeaderChannelTitle>
              <span>{channel.description}</span>
            </HeaderChannelRight>
          </HeaderChannel>

          <OptionsList>
            {channel.podcasts.map(podcast => (
              <OptionItem key={podcast.id}>
                <span>{podcast.title}</span>

                <OptionItemRight>
                  {podcast.fileUrl ? (
                    <audio controls>
                      <source src={podcast.fileUrl} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  ) : (
                    <label htmlFor="file">
                      <input
                        type="file"
                        id="file"
                        accept="audio/mpeg"
                        onChange={e => handleFileChange(e, podcast)}
                      />
                    </label>
                  )}

                  <button
                    type="button"
                    onClick={() => setDataShowModalEditPodcast(podcast)}
                  >
                    <FiEdit />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDataShowModalDeletePodcast(podcast)}
                  >
                    <FiTrash />
                  </button>
                </OptionItemRight>
              </OptionItem>
            ))}
          </OptionsList>

          <Button type="button" onClick={() => setShowModalCreatePodcast(true)}>
            Cadastrar novo episódio
          </Button>
        </Content>
      )}

      <Modal
        show={!!dataShowModalEditChannel}
        enableButtons={false}
        onClose={() => setDataShowModalEditChannel(null)}
      >
        <ModalEditChannel
          handleEditChannel={handleEditChannel}
          dataShowModalEditChannel={dataShowModalEditChannel}
          setDataShowModalEditChannel={setDataShowModalEditChannel}
        />
      </Modal>

      <Modal
        show={!!dataShowModalDeleteChannel}
        enableButtons={false}
        onClose={() => setDataShowModalDeleteChannel(null)}
      >
        <ModalDeleteChannel
          handleRemoveChannel={handleRemoveChannel}
          dataShowModalDeleteChannel={dataShowModalDeleteChannel}
          setDataShowModalDeleteChannel={setDataShowModalDeleteChannel}
        />
      </Modal>

      <Modal
        show={showModalCreatePodcast}
        enableButtons={false}
        onClose={() => setShowModalCreatePodcast(false)}
      >
        <ModalCreatePodcast
          handleAddPodcast={handleAddPodcast}
          setShowModalCreatePodcast={setShowModalCreatePodcast}
        />
      </Modal>

      <Modal
        show={!!dataShowModalEditPodcast}
        enableButtons={false}
        onClose={() => setDataShowModalEditPodcast(null)}
      >
        <ModalEditPodcast
          handleEditPodcast={handleEditPodcast}
          dataShowModalEditPodcast={dataShowModalEditPodcast}
          setDataShowModalEditPodcast={setDataShowModalEditPodcast}
        />
      </Modal>

      <Modal
        show={!!dataShowModalDeletePodcast}
        enableButtons={false}
        onClose={() => setDataShowModalDeletePodcast(null)}
      >
        <ModalDeletePodcast
          handleRemovePodcast={handleRemovePodcast}
          dataShowModalDeletePodcast={dataShowModalDeletePodcast}
          setDataShowModalDeletePodcast={setDataShowModalDeletePodcast}
        />
      </Modal>
    </Container>
  );
};

export default Categories;
