import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import getValidationErrors from '../../../utils/getValidationErrors';

import Button from '../../../components/Button';

import Input from '../../../components/Input';
import { Container, Bottom } from './styles';
import { IChannel } from '..';
import api from '../../../services/api';

interface IModalEditChannelFormData {
  name: string;
  description: string;
}

interface IModalEditChannelProps {
  handleEditChannel(newChannel: IChannel): void;
  dataShowModalEditChannel: IChannel | null;
  setDataShowModalEditChannel(data: IChannel | null): void;
}

export const ModalEditChannel: React.FC<IModalEditChannelProps> = ({
  handleEditChannel,
  dataShowModalEditChannel,
  setDataShowModalEditChannel,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IModalEditChannelFormData, { reset }) => {
      if (dataShowModalEditChannel) {
        try {
          formRef.current?.setErrors({});

          const schema = Yup.object().shape({
            name: Yup.string().required('Escreva o nome do canal'),
            description: Yup.string().required('Escreva a descrição do canal'),
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          const response = await api.put(
            `/channels/${dataShowModalEditChannel.id}`,
            data,
          );

          if (response?.data) {
            handleEditChannel(response.data);
            reset();
            setDataShowModalEditChannel(null);
          }
        } catch (err) {
          if (err instanceof Yup.ValidationError) {
            const errors = getValidationErrors(err);
            formRef.current?.setErrors(errors);
            return;
          } else {
            alert('Não foi possível editar o canal');
          }
        }
      }
    },
    [handleEditChannel, dataShowModalEditChannel, setDataShowModalEditChannel],
  );

  return (
    <Container>
      <h1>Edição de Canal</h1>

      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        initialData={{
          name: dataShowModalEditChannel?.name,
          description: dataShowModalEditChannel?.description,
        }}
      >
        <Input
          name="name"
          label="Nome"
          type="text"
          placeholder="Digite o nome do canal"
        />

        <Input
          name="description"
          label="Descrição"
          type="text"
          placeholder="Digite a descrição do canal"
        />

        <p>Você gostaria de confirmar essa edição de canal?</p>

        <Bottom>
          <Button
            type="button"
            onClick={() => setDataShowModalEditChannel(null)}
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
