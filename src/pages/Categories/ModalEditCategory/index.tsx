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

interface IModalEditCategoryFormData {
  title: string;
}

interface IModalEditCategoryProps {
  handleEditCategory(newCategory: ICategory): void;
  dataShowModalEditCategory: ICategory | null;
  setDataShowModalEditCategory(data: ICategory | null): void;
}

export const ModalEditCategory: React.FC<
  IModalEditCategoryProps
> = ({ handleEditCategory, dataShowModalEditCategory, setDataShowModalEditCategory }) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IModalEditCategoryFormData, { reset }) => {
      if (dataShowModalEditCategory) {
        try {
          formRef.current?.setErrors({});

          const schema = Yup.object().shape({
            title: Yup.string().required('Escreva o nome do categoria'),
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          const response = await api.put(`/categories/${dataShowModalEditCategory.id}`, data);

          if (response?.data) {
            handleEditCategory(response.data);
            reset();
            setDataShowModalEditCategory(null);
          }
        } catch (err) {
          if (err instanceof Yup.ValidationError) {
            const errors = getValidationErrors(err);
            formRef.current?.setErrors(errors);
            return;
          }else {
            alert('Não foi possível editar categoria')
          }
        }
      }
    },
    [handleEditCategory, dataShowModalEditCategory, setDataShowModalEditCategory],
  );

  return (
    <Container>
      <h1>Edição de Categoria</h1>

      <Form ref={formRef} onSubmit={handleSubmit} initialData={{ title: dataShowModalEditCategory?.title }}>
        <Input
          name="title"
          label="Categoria"
          type="text"
          placeholder="Digite o nome da categoria"
        />

        <p>
          Você gostaria de confirmar essa esdição de nova categoria? Após essa ação, ela ficará disponível para ser vinculada aos canais
        </p>

        <Bottom>
          <Button
            type="button"
            onClick={() => setDataShowModalEditCategory(null)}
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
