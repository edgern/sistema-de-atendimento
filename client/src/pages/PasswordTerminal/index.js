import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import Container from '../../components/Container';
import Button from '../../components/Button';

import * as S from './styles';

const socket = io('http://localhost:8080', { transports: ['websocket'] });

const PasswordTerminal = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [thanksButton, setThanksButton] = useState(false);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('[SOCKET] [USER] => New Connection');
    });

    socket.on('object.passwords', (data) => {
      const allPasswords = data.all;
      setCurrentPassword(allPasswords[allPasswords.length - 1]);
    });

    return () => {
      socket.off('connect');
      socket.off('object.passwords');
    };
  }, []);

  const selectPassword = (category) => {
    socket.emit('password.send', category);
    setThanksButton(true);
  };

  const showText = () => {
    return (
      thanksButton && (
        <S.CurrentPassword>
          Sua Senha: <span>{currentPassword}</span>
        </S.CurrentPassword>
      )
    );
  };

  const showPassword = () => {
    return (
      <>
        <S.WrapperButtons>
          {thanksButton ? (
            <Button onClick={() => setThanksButton(false)}>Voltar</Button>
          ) : (
            <>
              <Button onClick={() => selectPassword('SG')}>Normal</Button>
              <Button onClick={() => selectPassword('SP')}>Prioritária</Button>
              <Button onClick={() => selectPassword('SE')}>Retirada de exames</Button>
            </>
          )}
        </S.WrapperButtons>
        {showText()}
      </>
    );
  };

  return (
    <Container>
      <S.Wrapper>
        <h1>Por Favor Selecione Seu Tipo de Senha!</h1>
        {showPassword()}
      </S.Wrapper>
    </Container>
  );
};

export default PasswordTerminal;
