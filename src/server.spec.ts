import request from 'supertest';
import { HttpServer } from './server';
import { randomUUID } from 'crypto';
import mongo from './lib/mongo';

let testServer: HttpServer;

beforeAll(async () => {
  testServer = new HttpServer();
  await testServer.start();
});

afterAll(async () => {
  await testServer.server.stop();
  await mongo.close();
});

/*
I'm not testing any auth cases since i didn't added anything related to auth on the server
 */

describe('Testing server basics', () => {
  it('should sucess with current data in mongo',  (done) => {
    request(testServer.server.listener)
      .get('/v1')
      .expect(200, (err, res) => {
        expect(res.body).toBeTruthy()
        done();
      });
  });

  it('should sucess with real data inserted in mongo',  (done) => {
    const group = 'fake-group';
    const instanceId = randomUUID();
    request(testServer.server.listener)
      .post(`/v1/${group}/${instanceId}`)
      .expect(200, (err, res) => {
        console.log(res.body);
        done();
      });
  });
})
