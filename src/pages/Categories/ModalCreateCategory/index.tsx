import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import getValidationErrors from '../../../utils/getValidationErrors';

import Button from '../../../components/Button';

import Input from '../../../components/Input';
import { Container, Bottom } from './styles';
import { ICategory } from '..';
import api from '../../../services/api';

interface IModalCreateCategoryFormData {
  title: string;
}

interface IModalCreateCategoryProps {
  handleAddCategory(newCategory: ICategory): void;
  setShowModalCreateCategory(data: boolean): void;
}

export const ModalCreateCategory: React.FC<
  IModalCreateCategoryProps
> = ({ handleAddCategory, setShowModalCreateCategory }) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IModalCreateCategoryFormData, { reset }) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          title: Yup.string().required('Escreva o nome do categoria'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await api.post(`/categories`, data);

        if (response?.data) {
          handleAddCategory(response.data);
          reset();
          setShowModalCreateCategory(false);
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }else {
          alert('Não foi possível criar categoria')
        }
      }
    },
    [handleAddCategory, setShowModalCreateCategory],
  );

  return (
    <Container>
      <h1>Cadastro de Nova Categoria</h1>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="title"
          label="Categoria"
          type="text"
          placeholder="Digite o nome da  categoria"
        />

        <p>
          Você gostaria de confirmar esse cadastro de nova categoria? Após essa ação, ela ficará disponível para ser vinculada aos canais
        </p>

        <Bottom>
          <Button
            type="button"
            onClick={() => setShowModalCreateCategory(false)}
            className="back"
          >
            Voltar
          </Button>
          <Button type="submit" className='confirm'>Confirmar</Button>
        </Bottom>
      </Form>
    </Container>
  );
};
