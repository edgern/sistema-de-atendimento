import React, { useState } from 'react'
import Container from '../../components/Container/index'
import Button from '../../components/Button/index'
import io from 'socket.io-client'
import { v4 as uuid } from 'uuid'

import * as S from './styles'

const socket = io('http://localhost:8080', { transports: ['websocket'] })
socket.on('connect', () => console.log('[SOCKET] [SERVICE] => New Connection'))

const ServiceTerminal = () => {
  const id = uuid()

  const [password, setPassword] = useState()

  socket.on(`password.tv.${id}`, data => {
    setPassword(data)
  })

  const handleNextPassword = () => {
    socket.emit('password.next', id)
  }

  return (
    <Container>
      <S.Wrapper>
        <h1>Tela de gerenciamento de senhas</h1>
        <S.CurrentPassword>{password}</S.CurrentPassword>
        <p>Clique para proxima senha</p>
        <Button onClick={() => handleNextPassword()}>Chamar Senha</Button>
      </S.Wrapper>
    </Container>
  )
}

export default ServiceTerminal
