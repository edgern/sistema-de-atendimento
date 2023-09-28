import React from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../../components/Container'
import Button from '../../components/Button'

const Home = () => {
  const navigate = useNavigate()

  const handleNavigate = path => {
    navigate(path)
  }

  return (
    <Container>
      <Button onClick={() => handleNavigate('/password')}>
        <p>Retirar Senha</p>
      </Button>
      <Button onClick={() => handleNavigate('/service')}>
        <p>Terminal</p>
      </Button>
      <Button onClick={() => handleNavigate('/display')}>
        <p>Tela de senhas</p>
      </Button>
    </Container>
  )
}

export default Home
