import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../../utils/getValidationErrors';

import Button from '../../../components/Button';

import { Container, Bottom } from './styles';
import { IChannel } from '..';
import api from '../../../services/api';

interface IModalDeleteChannelProps {
  handleRemoveChannel(): void;
  dataShowModalDeleteChannel: IChannel | null;
  setDataShowModalDeleteChannel(data: IChannel | null): void;
}

export const ModalDeleteChannel: React.FC<IModalDeleteChannelProps> = ({
  handleRemoveChannel,
  dataShowModalDeleteChannel,
  setDataShowModalDeleteChannel,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async () => {
    if (dataShowModalDeleteChannel) {
      try {
        const response = await api.delete(
          `/channels/${dataShowModalDeleteChannel.id}`,
        );

        if (response) {
          handleRemoveChannel();
          setDataShowModalDeleteChannel(null);
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        } else {
          alert('Não foi possível deletar canal');
        }
      }
    }
  }, [
    dataShowModalDeleteChannel,
    handleRemoveChannel,
    setDataShowModalDeleteChannel,
  ]);

  return (
    <Container>
      <h1>Apagar Canal</h1>

      <p>Tem certeza que gostaria de apagar esse canal?</p>

      <Bottom>
        <Button
          type="button"
          onClick={() => setDataShowModalDeleteChannel(null)}
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
