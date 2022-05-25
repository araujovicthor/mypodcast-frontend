import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import getValidationErrors from '../../../utils/getValidationErrors';

import Button from '../../../components/Button';

import Input from '../../../components/Input';
import ReactSelect from '../../../components/ReactSelect';

import { Container, Bottom } from './styles';
import { IChannel } from '..';
import api from '../../../services/api';
import { ICategory } from '~/pages/Categories';

interface IModalCreateChannelFormData {
  name: string;
  description: string;
  categories: string;
}

interface IModalCreateChannelProps {
  handleAddChannel(newChannel: IChannel): void;
  setShowModalCreateChannel(data: boolean): void;
}

interface SelectCategory {
  value: string;
  label: string;
}

export const ModalCreateChannel: React.FC<IModalCreateChannelProps> = ({
  handleAddChannel,
  setShowModalCreateChannel,
}) => {
  const formRef = useRef<FormHandles>(null);
  const [categories, setCategories] = useState<SelectCategory[]>([]);

  useEffect(() => {
    api
      .get<ICategory[]>('/categories')
      .then(response => {
        const formattedCategories = response.data.map(category => ({
          value: category.id,
          label: category.title,
        }));

        setCategories(formattedCategories);
      })
      .catch(() => alert('Não foi possível carregar categorias'));
  }, []);

  const handleSubmit = useCallback(
    async (data: IModalCreateChannelFormData, { reset }) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Escreva o nome do canal'),
          description: Yup.string().required('Escreva a descrição do canal'),
          categories: Yup.string().required('Selecione ao menos uma categoria'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const body = {
          name: data.name,
          description: data.description,
          categoriesIds: [data.categories],
        };

        const response = await api.post(`/channels`, body);

        if (response?.data) {
          handleAddChannel(response.data);
          reset();
          setShowModalCreateChannel(false);
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        } else {
          alert('Não foi possível criar canal');
        }
      }
    },
    [handleAddChannel, setShowModalCreateChannel],
  );

  return (
    <Container>
      <h1>Cadastro de Novo Canal</h1>

      <Form ref={formRef} onSubmit={handleSubmit}>
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
          placeholder="Digite o descrição do canal"
        />

        <ReactSelect
          name="categories"
          options={categories}
          placeholder="Selecione a categoria"
        ></ReactSelect>

        <Bottom>
          <Button
            type="button"
            onClick={() => setShowModalCreateChannel(false)}
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
