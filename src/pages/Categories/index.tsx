import React, { useCallback, useEffect, useState } from 'react';
import { FiEdit, FiExternalLink, FiTrash } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import { ModalCreateCategory } from './ModalCreateCategory';

import { Container, Content, OptionsList, OptionItem, OptionItemRight } from './styles';
import { ModalEditCategory } from './ModalEditCategory';
import { ModalDeleteCategory } from './ModalDeleteCategory';
import api from '../../services/api';

export interface ICategory {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

const Categories: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<ICategory[] | null>(null)
  const [showModalCreateCategory, setShowModalCreateCategory] = useState(false);
  const [dataShowModalDeleteCategory, setDataShowModalDeleteCategory] = useState<ICategory | null>(null);
  const [dataShowModalEditCategory, setDataShowModalEditCategory] = useState<ICategory | null>(null);

  useEffect(() => {
    api.get('/categories')
      .then(response => setCategories(response.data))
      .catch(() => alert('Não foi possível carregar categorias'))
  }, [])

  const navigateToCategory = useCallback((category: string) => {
    navigate(category)
  }, [navigate])

  const handleAddCategory = useCallback((category: ICategory) => {
    if (categories) setCategories([...categories, category])
  }, [categories])

  const handleEditCategory = useCallback((category: ICategory) => {
    if (categories) {
      const removedCategories = categories.map(item => {
        if (item.id === category.id) return category;
        return item;
      })
      setCategories(removedCategories)
    }
  }, [categories])


  const handleRemoveCategory = useCallback((category: ICategory) => {
    if (categories) {
      const removedCategories = categories.filter(item => {
        return item.id !== category.id
      })
      setCategories(removedCategories)
    }
  }, [categories])


  return (
    <Container>
      <Content>
        <h1>Categorias</h1>

        <OptionsList>
          {categories && categories.map(option => (
            <OptionItem key={option.id}>
              <span>{option.title}</span>

              <OptionItemRight>
                <button type='button' onClick={() => navigateToCategory(`/canais/${option.id}`)}>
                  <FiExternalLink />
                </button>
                <button type='button' onClick={() => setDataShowModalEditCategory(option)}>
                  <FiEdit />
                </button>
                <button type='button' onClick={() => setDataShowModalDeleteCategory(option)}>
                  <FiTrash />
                </button>
              </OptionItemRight>
            </OptionItem>
          ))}
        </OptionsList>

        <Button type="button" onClick={() => setShowModalCreateCategory(true)}>
          Cadastrar nova categoria
        </Button>
      </Content>

      <Modal
        show={!!dataShowModalEditCategory}
        enableButtons={false}
        onClose={() => setDataShowModalEditCategory(null)}
      >
        <ModalEditCategory
          handleEditCategory={handleEditCategory}
          dataShowModalEditCategory={dataShowModalEditCategory}
          setDataShowModalEditCategory={setDataShowModalEditCategory}
        />
      </Modal>

      <Modal
        show={showModalCreateCategory}
        enableButtons={false}
        onClose={() => setShowModalCreateCategory(false)}
      >
        <ModalCreateCategory
          handleAddCategory={handleAddCategory}
          setShowModalCreateCategory={setShowModalCreateCategory}
        />
      </Modal>

      <Modal
        show={!!dataShowModalDeleteCategory}
        enableButtons={false}
        onClose={() => setDataShowModalDeleteCategory(null)}
      >
        <ModalDeleteCategory
          handleRemoveCategory={handleRemoveCategory}
          dataShowModalDeleteCategory={dataShowModalDeleteCategory}
          setDataShowModalDeleteCategory={setDataShowModalDeleteCategory}
        />
      </Modal>

    </Container>
  );
};

export default Categories;
