import debugLib from 'debug';
import http from 'http';

import app from './app';

const debug = debugLib('backend-express:server');

import connection from './db';
import sequelize from './services/sequelizeService';
import Chats from './models/Chats';
import ChatHistory from './models/ChatHistory';
// require("./app/routes/conversation.routes")(app);

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

//sync() method 

// connection.sequelize.sync()
//   .then(() => {
//     console.log("Synced db.");
//   })
//   .catch((err) => {
//     console.log("Failed to sync db: " + err.message);
//   });

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on : ', port);
  const DBNAME = process.env.DATABASE_NAME;
  sequelize
  .authenticate()
  .then(async() => {
    console.log('Connection has been established successfully.');
    Chats.hasMany(ChatHistory);
    ChatHistory.belongsTo(Chats);
    await sequelize.sync();
    // await sequelize.close();
  })
  .catch(async(err) => {
    console.error('Unable to connect to the database:', err);
  });
  debug('Listening on ' + bind);
};
