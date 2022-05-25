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

interface IModalEditPodcastFormData {
  title: string;
}

interface IModalEditPodcastProps {
  handleEditPodcast(newPodcast: IPodcast): void;
  dataShowModalEditPodcast: IPodcast | null;
  setDataShowModalEditPodcast(data: IPodcast | null): void;
}

export const ModalEditPodcast: React.FC<IModalEditPodcastProps> = ({
  handleEditPodcast,
  dataShowModalEditPodcast,
  setDataShowModalEditPodcast,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IModalEditPodcastFormData, { reset }) => {
      if (dataShowModalEditPodcast) {
        try {
          formRef.current?.setErrors({});

          const schema = Yup.object().shape({
            title: Yup.string().required('Escreva o nome do episódio'),
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          const response = await api.put(
            `/podcasts/${dataShowModalEditPodcast.id}`,
            data,
          );

          if (response?.data) {
            handleEditPodcast(response.data);
            reset();
            setDataShowModalEditPodcast(null);
          }
        } catch (err) {
          if (err instanceof Yup.ValidationError) {
            const errors = getValidationErrors(err);
            formRef.current?.setErrors(errors);
            return;
          } else {
            alert('Não foi possível editar o episódio');
          }
        }
      }
    },
    [handleEditPodcast, dataShowModalEditPodcast, setDataShowModalEditPodcast],
  );

  return (
    <Container>
      <h1>Edição de Episódio</h1>

      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        initialData={{ title: dataShowModalEditPodcast?.title }}
      >
        <Input
          name="title"
          label="Episódio"
          type="text"
          placeholder="Digite o nome do episódio"
        />

        <p>Você gostaria de confirmar essa edição de episódio?</p>

        <Bottom>
          <Button
            type="button"
            onClick={() => setDataShowModalEditPodcast(null)}
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
