import request from 'supertest';
import { HttpServer } from '../../server';
import mongo from '../../lib/mongo';
import { randomUUID } from 'crypto';

let testServer: HttpServer;
const fakeData = ['group1', 'group1', 'group1', 'group2'];

beforeAll(async () => {
  testServer = new HttpServer();
  await testServer.start();

  for (const group of fakeData) {
    const id = randomUUID();
    await mongo.upsert('instances', { id }, { updatedAt: Date.now() }, {
      id,
      group,
      createdAt: Date.now()
    })
  }
});

afterAll(async () => {
  await testServer.server.stop();
  await mongo.init();
  await mongo.cleanCollection('instances');
  await mongo.close();
});



describe('Testing GET /v1 route', () => {
  it('should return success with data grouped by instances',  (done) => {
    request(testServer.server.listener)
      .get('/v1')
      .expect(200, (err, res) => {
        const sortedResponse = res.body.sort( (a: { count: number; }, b: { count: number; }) => b.count - a.count );
        expect(sortedResponse).toHaveLength(2);
        expect(sortedResponse[0].count).toEqual(3);
        done();
      });
  });

  it('should return error when code fails', async () => {
    const errorText = 'Something failed getting item';
    const mockedObject = jest.spyOn(mongo, 'find').mockImplementation(() => {
      throw new Error(errorText);
    });

    const response = await request(testServer.server.listener).get('/v1')
    expect(response.text).toMatch(errorText);
    mockedObject.mockRestore();
  });
});

describe('Testing /v1/:group route', () => {
  it('should return success with all data from specific group',  (done) => {
    request(testServer.server.listener)
      .get('/v1/group1')
      .expect(200, (err, res) => {
        expect(res.body).toHaveLength(3);
        done();
      });
  });

  it('should return success with empty array',  (done) => {
    request(testServer.server.listener)
      .get('/v1/someothergroup')
      .expect(200, (err, res) => {
        expect(res.body).toHaveLength(0);
        done();
      });
  });
});
