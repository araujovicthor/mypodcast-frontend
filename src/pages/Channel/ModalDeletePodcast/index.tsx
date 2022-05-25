import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../../utils/getValidationErrors';

import Button from '../../../components/Button';

import { Container, Bottom } from './styles';
import { IPodcast } from '..';
import api from '../../../services/api';

interface IModalDeletePodcastProps {
  handleRemovePodcast(newPodcast: IPodcast): void;
  dataShowModalDeletePodcast: IPodcast | null;
  setDataShowModalDeletePodcast(data: IPodcast | null): void;
}

export const ModalDeletePodcast: React.FC<IModalDeletePodcastProps> = ({
  handleRemovePodcast,
  dataShowModalDeletePodcast,
  setDataShowModalDeletePodcast,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async () => {
    if (dataShowModalDeletePodcast) {
      try {
        const response = await api.delete(
          `/podcasts/${dataShowModalDeletePodcast.id}`,
        );

        if (response) {
          handleRemovePodcast(dataShowModalDeletePodcast);
          setDataShowModalDeletePodcast(null);
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        } else {
          alert('Não foi possível deletar podcast');
        }
      }
    }
  }, [
    dataShowModalDeletePodcast,
    handleRemovePodcast,
    setDataShowModalDeletePodcast,
  ]);

  return (
    <Container>
      <h1>Apagar Podcast</h1>

      <p>Tem certeza que gostaria de apagar esse podcast?</p>

      <Bottom>
        <Button
          type="button"
          onClick={() => setDataShowModalDeletePodcast(null)}
          className="back"
        >
          Voltar
        </Button>
        <Button type="button" onClick={handleSubmit} className="cancel">
          Confirmar
        </Button>
      </Bottom>
    </Container>
  );
};
