import React, { useState, useEffect } from 'react';

const Resume = () => {
  const [totalPasswords, setTotalPasswords] = useState(0);

  // Use useEffect para se inscrever a eventos de senha gerada ou atualizada
  useEffect(() => {
    const socket = io('http://localhost:8080', { transports: ['websocket'] });

    // Subscreva-se a eventos relevantes, como "password.generated"
    socket.on('password.generated', (data) => {
      // Atualize o estado com o novo número de senhas
      setTotalPasswords(data.total);
    });

    // Lembre-se de remover o ouvinte quando o componente for desmontado
    return () => {
      socket.off('password.generated');
    };
  }, []);

  return (
    <div>
      <h2>Relatório de Senhas Geradas no Dia</h2>
      <p>Total de Senhas Geradas: {totalPasswords}</p>
    </div>
  );
};

export default Resume;
