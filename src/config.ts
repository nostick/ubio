export default {
  mongo: {
    username: process.env.MONGO_USER || 'user',
    password: process.env.MONGO_PASS || 'password',
    db: process.env.MONGO_DB || 'ubio',
    host: process.env.MONGO_HOST || '127.0.0.1',
    port: process.env.MONGO_PORT || '27017'
  },
  expirationTime: process.env.EXPIRATION_TIME || 60,
  port: process.env.PORT || 4000
}
