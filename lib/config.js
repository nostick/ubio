"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    mongo: {
        username: process.env.MONGO_USER,
        password: process.env.MONGO_PASS,
        db: process.env.MONGO_DB,
        host: process.env.MONGO_HOST,
        port: process.env.MONGO_PORT
    },
    expirationTime: process.env.EXPIRATION_TIME
};
