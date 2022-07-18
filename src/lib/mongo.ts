import { Document, Filter, MongoClient } from 'mongodb';
import config from '../config';

const { username, password, host, port, db} = config.mongo;

class Mongo {
  private readonly client;

  constructor(uri: string) {
    this.client = new MongoClient(uri);
  }

  async init(): Promise<Document> {
    await this.client.connect();
    return this.client.db(db).command({ping: 1});
  }

  async find(collection: string, filter: Filter<Document>): Promise<Document[]> {
    return this.client.db(db).collection(collection).find(filter).toArray();
  }

  async upsert(
    collection: string,
    query: Filter<Document>,
    dataToUpdate: Document,
    dataToInsert: Document): Promise<Document> {
      return this.client.db(db).collection(collection).findOneAndUpdate(query, {
          $set: dataToUpdate,
          $setOnInsert: dataToInsert,
        },
        {
          upsert: true,
          returnDocument: 'after'
        });
  }

  async delete(collection: string, filter: Filter<Document>): Promise<Document> {
    return this.client.db(db).collection(collection).deleteOne(filter);
  }

  async cleanCollection(collection: string) {
    return this.client.db(db).collection(collection).deleteMany({});
  }

  async aggregate(collection: string, aggr: Document[]): Promise<Document> {
    return this.client.db(db).collection(collection).aggregate(aggr);
  }

  async close(): Promise<void> {
    return this.client.close();
  }
}

export default new Mongo(`mongodb://${username}:${password}@${host}:${port}/${db}`);
