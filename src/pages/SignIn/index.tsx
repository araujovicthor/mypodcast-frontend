import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';

import { useAuth } from '../../hooks/auth';

import { Container, Content, BottomOptions } from './styles';

import logo from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';

interface ISignInFormData {
  email: string;
  password: string;
}


const SignIn: React.FC = () => {

  const { signIn, setLoading } = useAuth();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ISignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Digite o seu e-mail')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Digite a sua senha'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({ email: data.email, password: data.password });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }else {
          alert('Não foi possível fazer login')
        }

        setLoading(false);

      }
    },
    [setLoading, signIn],
  );

  return (
    <Container>
      <Content>
        <img src={logo} alt="My poadcast" />

        <Form ref={formRef} onSubmit={handleSubmit}>
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
            Entrar
          </Button>


          <BottomOptions>
            <Link to="/cadastrar" >
              Ou cadastre-se
            </Link>
          </BottomOptions>
        </Form>
      </Content>
    </Container>
  );
};

export default SignIn;
