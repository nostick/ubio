import Hapi from '@hapi/hapi';
import { Server } from '@hapi/hapi';

import routes from './routes';

export class HttpServer {
  private readonly _server: Server

  /**
   * Here maybe we can pass a json payload with some arguments to config the server,
   * since this is only for testing purposes I'm using the simplest default config,
   * i'm mentioning this since in the framework i got as reference,
   * they were creating a server with arguments for different needs, so basically here i'm just
   * giving the option to scale and achieve something similar to the framework
   */
  constructor() {
    this._server = Hapi.server({
      port: process.env.PORT || 4000,
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
