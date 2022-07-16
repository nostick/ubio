"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const config_1 = __importDefault(require("../config"));
const { username, password, host, port, db } = config_1.default.mongo;
class Mongo {
    constructor(uri) {
        this.client = new mongodb_1.MongoClient(uri);
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.connect();
            return this.client.db(db).command({ ping: 1 });
        });
    }
    find(collection, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.db(db).collection(collection).find(filter).toArray();
        });
    }
    upsert(collection, query, dataToUpdate, dataToInsert) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.db(db).collection(collection).findOneAndUpdate(query, {
                $set: dataToUpdate,
                $setOnInsert: dataToInsert,
            }, {
                upsert: true,
                returnDocument: 'after'
            });
        });
    }
    delete(collection, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.db(db).collection(collection).deleteOne(filter);
        });
    }
    aggregate(collection, aggr) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.db(db).collection(collection).aggregate(aggr);
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.close();
        });
    }
}
exports.default = new Mongo(`mongodb://${username}:${password}@${host}:${port}/${db}`);
