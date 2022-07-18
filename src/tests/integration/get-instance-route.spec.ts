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

/**
 * Since i'm using the same route with optional arguments, i'll be testing here the specs regarding
 * route GET / and GET /:group
 */

/**
 * Probably the best to do is to create an ErrorHandler or something to catch and format
 * errors to make them more readable and usable, for now just returning the error that happens
 */

/**
 * There is a test case on challenge that says
 * -groups containing 0 instances should not be returned-
 * This is being filtered by the aggregation framework when we get the instances from mongo
 * also i don't think this case is actually possible to recreate since i'm using a single collection
 * with instances and then grouping them by group key, so if there is not any instance, then neither the
 * group or instance id would exists in collection, so that's why i'm not creating a test for that, basically
 * no possible to recreate with this DB data model.
 */
