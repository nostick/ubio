import request from 'supertest';
import { HttpServer } from '../../server';
import mongo from '../../lib/mongo';
import { randomUUID } from 'crypto';

let testServer: HttpServer;
const fakeGroup = 'fake-group';
const fakeID = randomUUID();

beforeAll(async () => {
  testServer = new HttpServer();
  await testServer.start();

  await mongo.upsert('instances', { id: fakeID }, { updatedAt: Date.now() }, {
    group: fakeGroup,
    id: fakeID,
    createdAt: Date.now()
  });
});

afterAll(async () => {
  await testServer.server.stop();
  await mongo.init();
  await mongo.cleanCollection('instances');
  await mongo.close();
});

describe('Testing DELETE /v1/{group}/{id} route', () => {
  it('should return success with data grouped by instances',  async () => {
    const existingInstance = await mongo.find('instances', { id: fakeID, group: fakeGroup });
    expect(existingInstance).toHaveLength(1);
    expect(existingInstance[0].group).toEqual(fakeGroup);
    expect(existingInstance[0].id).toEqual(fakeID);

    await request(testServer.server.listener).delete(`/v1/${fakeGroup}/${fakeID}`);

    await mongo.init();
    const mongoResponse = await mongo.find('instances', { id: fakeID, group: fakeGroup });
    expect(mongoResponse).toHaveLength(0);
  });

  it('should return error when code fails',  async () => {
    const errorText = 'Something failed deleting item';
    let mockedObject = jest.spyOn(mongo, 'delete').mockImplementation(() => {
      throw new Error(errorText);
    });

    const response = await request(testServer.server.listener).delete(`/v1/${fakeGroup}/${fakeID}`);
    expect(response.text).toMatch(errorText);
    mockedObject.mockRestore();
  });
});
