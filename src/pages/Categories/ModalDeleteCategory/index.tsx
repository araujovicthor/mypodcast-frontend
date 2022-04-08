import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../../utils/getValidationErrors';

import Button from '../../../components/Button';

import { Container, Bottom } from './styles';
import { ICategory } from '..';
import api from '../../../services/api';


interface IModalDeleteCategoryProps {
  handleRemoveCategory(newCategory: ICategory): void;
  dataShowModalDeleteCategory: ICategory | null;
  setDataShowModalDeleteCategory(data: ICategory | null): void;
}

export const ModalDeleteCategory: React.FC<
  IModalDeleteCategoryProps
> = ({ handleRemoveCategory, dataShowModalDeleteCategory, setDataShowModalDeleteCategory }) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async () => {
    if (dataShowModalDeleteCategory) {
      try {
        const response = await api.delete(`/categories/${dataShowModalDeleteCategory.id}`);

        if (response) {
          handleRemoveCategory(dataShowModalDeleteCategory);
          setDataShowModalDeleteCategory(null);
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        } else {
          alert('Não foi possível deletar categoria')
        }
      }
    }
  },
    [dataShowModalDeleteCategory, handleRemoveCategory, setDataShowModalDeleteCategory],
  );

  return (
    <Container>
      <h1>Apagar Categoria</h1>

      <p>
        Tem certeza que gostaria de apagar essa categoria? Todas os canais que possuem essa categoria serão afetadas por essa ação
      </p>

      <Bottom>
        <Button
          type="button"
          onClick={() => setDataShowModalDeleteCategory(null)}
          className="back"
        >
          Voltar
        </Button>
        <Button type="button" onClick={handleSubmit} className='confirm'>Confirmar</Button>
      </Bottom>
    </Container>
  );
};
