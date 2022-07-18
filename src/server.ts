import Hapi from '@hapi/hapi';
import { Server } from '@hapi/hapi';

import routes from './routes';

export class HttpServer {
  private readonly _server: Server

  constructor() {
    this._server = Hapi.server({
      port: process.env.PORT,
      host: '0.0.0.0',
    });
  }

  async start(): Promise<void> {
    this.registerRoutes();
    return this.server.start();
  }

  registerRoutes(): any {
    try {
      this._server.route(routes);
    } catch (err) {
      return err;
    }
  }

  get server(): Server {
    return this._server
  }
}

/* istanbul ignore next */
process.on('unhandledRejection', (err) => {
  console.error('unhandledRejection');
  console.error(err);
  process.exit(1);
});
