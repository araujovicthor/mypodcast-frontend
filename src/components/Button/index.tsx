import React, { ButtonHTMLAttributes } from 'react';

import { Container  } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  disabled = false,
  onClick,
  ...rest
}) => (
  <Container
    type="button"
    disabled={disabled}
    data-testid="button"
    onClick={onClick && !disabled ? onClick : () => {}}
    isLoading={loading}
    {...rest}
  >
    {loading ? '...' : children}
  </Container>
);

export default Button;
