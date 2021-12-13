import http from 'http';
import socket from 'socket.io';
import chalk from 'chalk';

import mongoose from '~/core/mongoose';
import redis from '~/core/redis';

import { PORT, HOST } from './env';
import app from './app';

const server = http.Server(app);
const io = socket(server);

app.set('socket', io);
io.origins(['*:*']);

server.listen(Number(PORT), HOST, () => {
  console.log(chalk.hex('#009688')('🚀 App: Bootstrap Succeeded.'));
  console.log(chalk.hex('#009688')(`🚀 Host: http://${HOST}:${PORT}/.`));

  mongoose.connection.once('open', () => console.log(chalk.hex('#009688')('🚀 Mongo: Connection Succeeded.')));
  mongoose.connection.on('error', err => console.error(err));

  redis.on('connect', () => console.log(chalk.hex('#009688')('🚀 Redis: Connection Succeeded.')));
  redis.on('error', err => console.error(err));
});

io.on('connection', (connSocket) => {
  console.log(chalk.hex('#009688')('🚀 Socket: Connection Succeeded.'));
  connSocket.on('disconnect', () => console.log(chalk.hex('#009688')('🚀 Socket: Disconnected.')));
});

export default server;
