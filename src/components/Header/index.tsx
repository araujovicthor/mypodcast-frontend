import React from 'react';
import { useAuth } from '../../hooks/auth';

import { useNavigate } from 'react-router-dom';

import { FiLogIn } from 'react-icons/fi';
import logo from '../../assets/logo.svg';

import { Container, Content, HeaderRight } from './styles';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <Container>
      <Content>
        <button
          type="button"
          onClick={() => {
            navigate('/dashboard');
          }}
        >
          <img src={logo} alt="My poadcast" />
        </button>
        <HeaderRight>
          <span>{user.name}</span>

          <button type="button" onClick={signOut}>
            <FiLogIn />
          </button>
        </HeaderRight>
      </Content>
    </Container>
  );
};

export default Header;
