import React, { useCallback } from 'react';

import Button from '../Button';

import { Wrapper, Container, Content, ButtonsContainer } from './styles';

interface IModalProps {
  show: boolean;
  enableButtons?: boolean;
  onConfirm?(): void;
  onClose?(): void;
  isInnerModal?: boolean;
}

const Modal: React.FC<IModalProps> = ({
  show,
  enableButtons = true,
  onClose = () => {},
  onConfirm = () => {},
  isInnerModal = false,
  children,
}) => {
  const confirm = useCallback(() => {
    onConfirm();
  }, [onConfirm]);

  const cancel = useCallback(() => {
    onClose();
  }, [onClose]);

  const handlePropagation = useCallback(e => {
    e.stopPropagation();
  }, []);

  return (
    <Wrapper
      display={show ? 'block' : 'none'}
      onClick={onClose}
      data-testid="modal"
      isInnerModal={isInnerModal}
    >
      <Container onClick={handlePropagation} className="modal">
        <Content>
          {show && children}
          {enableButtons && (
            <ButtonsContainer>
              <Button
                title="Cancelar"
                className="cancel"
                type="button"
                onClick={cancel}
              >
                Cancelar
              </Button>
              <Button
                title="Confirmar"
                type="button"
                onClick={confirm}
              >
                Confirmar
              </Button>
            </ButtonsContainer>
          )}
        </Content>
      </Container>
    </Wrapper>
  );
};

export default Modal;
