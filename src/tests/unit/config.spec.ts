process.env.MONGO_USER = '';
process.env.MONGO_PASS = '';
process.env.MONGO_DB = '';
process.env.MONGO_HOST = '';
process.env.MONGO_PORT = '';
process.env.EXPIRATION_TIME = '';
process.env.PORT = '';

import config from '../../config';

describe('Testing config file', () => {
  it('Should take default values when nothing on process', () => {
    expect(config.mongo.username).toEqual('user');
    expect(config.mongo.password).toEqual('password');
    expect(config.mongo.db).toEqual('ubio');
    expect(config.mongo.host).toEqual('127.0.0.1');
    expect(config.mongo.port).toEqual('27017');
    expect(config.expirationTime).toEqual(60);
  });
})
