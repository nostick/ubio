import { HttpServer } from '../../server';
import mongo from '../../lib/mongo';
import exp from 'constants';

let testServer: HttpServer;


afterAll(async () => {
  await mongo.init();
  await mongo.cleanCollection('instances');
  await mongo.close();
  await testServer.server.stop();
});

describe('Server tests', () => {
  afterEach(async () => {
    await testServer.server.stop();
  });

  it('should start server', async () => {
    const serverUri = 'http://0.0.0.0:4000';
    testServer = new HttpServer();
    await testServer.start();
    expect(testServer.server.info.uri).toEqual(serverUri);

  });

  it('should fail starting server', async () => {
    testServer = new HttpServer();

    const errorText = 'Something failed registering routes';
    let mockedObject = jest.spyOn(testServer.server, 'route').mockImplementation(() => {
      throw new Error(errorText);
    });

    try {
      await testServer.start()
    } catch ( e ) {
      console.log(e);
    }

    mockedObject.mockRestore();
  });
})
