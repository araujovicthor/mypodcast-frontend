import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { Form } from '@unform/web';

import { Container, Content, BottomOptions } from './styles';

import logo from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

interface ISignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (data: ISignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'Mínimo de 6 digitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        navigate('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        } else {
          alert('Não foi possível cadastrar')
        }
      }
    },
    [navigate],
  );

  return (
    <Container>
      <Content>
        <img src={logo} alt="My poadcast" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="name"
            label="Nome"
            type="text"
            placeholder="Digite o seu nome"
          />

          <Input
            name="email"
            label="E-mail"
            type="text"
            placeholder="Digite o seu e-mail"
          />

          <Input
            name="password"
            label="Senha"
            type="password"
            placeholder="Digite a sua senha"
          />

          <Button type="submit" >
            Cadastrar
          </Button>

          <BottomOptions>
            <Link to="/" >
              Ou faça login
            </Link>
          </BottomOptions>
        </Form>
      </Content>
    </Container>
  );
};

export default SignUp;
