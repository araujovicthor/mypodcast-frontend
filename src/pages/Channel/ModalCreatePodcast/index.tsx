import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import getValidationErrors from '../../../utils/getValidationErrors';

import Button from '../../../components/Button';

import Input from '../../../components/Input';
import { Container, Bottom } from './styles';
import { IPodcast } from '..';
import api from '../../../services/api';
import { useParams } from 'react-router-dom';

interface IModalCreatePodcastFormData {
  title: string;
  channelId: string;
}

interface IModalCreatePodcastProps {
  handleAddPodcast(newPodcast: IPodcast): void;
  setShowModalCreatePodcast(data: boolean): void;
}

export const ModalCreatePodcast: React.FC<IModalCreatePodcastProps> = ({
  handleAddPodcast,
  setShowModalCreatePodcast,
}) => {
  const formRef = useRef<FormHandles>(null);

  const { id } = useParams();

  const handleSubmit = useCallback(
    async (data: IModalCreatePodcastFormData, { reset }) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          title: Yup.string().required('Escreva o nome do episódio'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const body = {
          title: data.title,
          channelId: id,
        };

        const response = await api.post(`/podcasts`, body);

        if (response?.data) {
          handleAddPodcast(response.data);
          reset();
          setShowModalCreatePodcast(false);
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        } else {
          alert('Não foi possível criar episódio');
        }
      }
    },
    [handleAddPodcast, setShowModalCreatePodcast, id],
  );

  return (
    <Container>
      <h1>Cadastro de Novo Episódio</h1>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="title"
          label="Episódio"
          type="text"
          placeholder="Digite o nome do episódio"
        />

        <p>Você gostaria de confirmar esse cadastro de novo episódio?</p>

        <Bottom>
          <Button
            type="button"
            onClick={() => setShowModalCreatePodcast(false)}
            className="back"
          >
            Voltar
          </Button>
          <Button type="submit" className="confirm">
            Confirmar
          </Button>
        </Bottom>
      </Form>
    </Container>
  );
};
