const koa = require('koa');
const http = require('http');
const socket = require('socket.io');

const app = new koa();
const server = http.createServer(app.callback());
const io = socket(server);

const SERVER_HOST = 'localhost';
const SERVER_PORT = 8080;

const passwords = {
  SP: [],
  SG: [],
  SE: [],
  all: [],
};

const counters = {
  SP: 1,
  SG: 1,
  SE: 1,
};

const getFormattedDate = () => {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = ('0' + (now.getMonth() + 1)).slice(-2);
  const day = ('0' + now.getDate()).slice(-2);
  return `${year}${month}${day}`;
};

const generatePassword = (tipoSenha) => {
  const sequenciaStr = ('0' + counters[tipoSenha]++).slice(-2);
  const numeroSenha = `${getFormattedDate()}-${tipoSenha}${sequenciaStr}`;
  return numeroSenha;
};

const getNormalPassword = () => {
  const value = generatePassword('SG');
  passwords['SG'].push(value);
  passwords['all'].push(value);
};

const getPrioritaryPassword = () => {
  const value = generatePassword('SP');
  passwords['SP'].push(value);
  passwords['all'].push(value);
};

const getExamsPassword = () => {
  const value = generatePassword('SE');
  passwords['SE'].push(value);
  passwords['all'].push(value);
};

const getData = (data) => {
  switch (data) {
    case 'SP':
      getPrioritaryPassword();
      break;
    case 'SE':
      getExamsPassword();
      break;
    default:
      getNormalPassword();
  }
};

const handleNextPassword = () => {
  const firstPassword = passwords['all'][0];
  if (firstPassword) {
    const tipoSenha = firstPassword.substring(9, 11);

    io.sockets.emit('password.next', firstPassword);
    io.sockets.emit('password.tv.update', firstPassword);
    io.sockets.emit(`password.tv.${tipoSenha}`, firstPassword);

    console.log(`[SOCKET] [SERVER] => NEXT PASSWORD ${firstPassword}`);
    passwords['all'].splice(0, 1);
  } else {
    console.log('Fila de senhas vazia.');
  }
};

io.on('connection', (socket) => {
  console.log('[IO - CLIENT] Connection => server has a new connection');

  socket.on('password.send', (data) => {
    console.log('[SOCKET SERVER] New password type => ', data);

    getData(data);
    io.sockets.emit('object.passwords', passwords);
  });

  socket.on('password.next', () => {
    handleNextPassword();
  });

  socket.on('disconnect', () => {
    console.log('[SOCKET SERVER] User Disconnect');
  });
});

server.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log('[http] Server running...');
});

server.off('server.off', () => {
  console.log('[http] Server stopping...');
});
