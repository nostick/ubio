import { HttpServer } from './server';

// Init HTTP Server
const httpServer = new HttpServer();
httpServer.start().then(r => console.log(`Server started successfully`));
