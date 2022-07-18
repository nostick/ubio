import { HttpServer } from './server';
import config from './config';
// Init HTTP Server
const httpServer = new HttpServer();
httpServer.start().then(r => console.log(`Server started successfully on ${config.port}`));
