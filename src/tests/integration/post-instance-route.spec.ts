import request from 'supertest';
import { randomUUID } from 'crypto';
import { HttpServer } from '../../server';
import mongo from '../../lib/mongo';

let testServer: HttpServer;

beforeAll(async () => {
  testServer = new HttpServer(4001);
  await testServer.start();
});

afterAll(async () => {
  await testServer.server.stop();
  await mongo.init();
  await mongo.cleanCollection('instances');
  await mongo.close();
});

describe('Testing POST /v1/:group/:id', () => {
  it('should return success when document inserted',  (done) => {
    const group = 'fake-group';
    const instanceId = randomUUID();
    request(testServer.server.listener)
      .post(`/v1/${group}/${instanceId}`)
      .expect(200, (err, res) => {
        expect(res.body.group).toEqual(group);
        expect(res.body.id).toEqual(instanceId);
        done();
      });
  });

  it('should return error when empty string as group',  (done) => {
    const group = ' ';
    const instanceId = randomUUID();
    request(testServer.server.listener)
      .post(`/v1/${group}/${instanceId}`)
      .expect(400, (err, res) => {
        expect(res.body.message).toEqual('Invalid request params input');
        done();
      });
  });

  it('should return error when invalid type as group',  (done) => {
    const group = 1;
    const instanceId = randomUUID();
    request(testServer.server.listener)
      .post(`/v1/${group}/${instanceId}`)
      .expect(400, (err, res) => {
        expect(res.body.message).toEqual('Invalid request params input');
        done();
      });
  });

  it('should return error when undefined string as group',  (done) => {
    const group = '';
    const instanceId = randomUUID();
    request(testServer.server.listener)
      .post(`/v1/${group}/${instanceId}`)
      .expect(404, (err, res) => {
        expect(res.body.message).toEqual('Not Found');
        done();
      });
  });

  it('should return error when empty string as instance id',  (done) => {
    const group = 'fake-group';
    const instanceId = ' ';
    request(testServer.server.listener)
      .post(`/v1/${group}/${instanceId}`)
      .expect(400, (err, res) => {
        expect(res.body.message).toEqual('Not Found');
        done();
      });
  });

  it('should return error when invalid type as instance id',  (done) => {
    const group = 'fake-group';
    const instanceId = 1;
    request(testServer.server.listener)
      .post(`/v1/${group}/${instanceId}`)
      .expect(400, (err, res) => {
        expect(res.body.message).toEqual('Invalid request params input');
        done();
      });
  });

  it('should return error when undefined string as instance id',  (done) => {
    const group = 'fake-group';
    const instanceId = '';
    request(testServer.server.listener)
      .post(`/v1/${group}/${instanceId}`)
      .expect(404, (err, res) => {
        expect(res.body.message).toEqual('Not Found');
        done();
      });
  });

  it('should return error when undefined string as instance id',  async () => {
    const group = 'fake-group';
    const instanceId = randomUUID();

    const errorText = 'Something failed creating item';
    let mockedObject = jest.spyOn(mongo, 'upsert').mockImplementation(() => {
      throw new Error(errorText);
    });

    const response = await request(testServer.server.listener).post(`/v1/${group}/${instanceId}`);
    expect(response.text).toMatch(errorText);
    mockedObject.mockRestore();
  });
})
