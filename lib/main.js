"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
// Init HTTP Server
const httpServer = new server_1.HttpServer();
httpServer.start().then(r => console.log(`Server started successfully`));
