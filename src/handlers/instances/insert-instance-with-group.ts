import { Request, ResponseObject, ResponseToolkit } from '@hapi/hapi';
import mongo from '../../lib/mongo';
import { Document } from 'mongodb';

export async function insertInstanceWithGroup(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
  let response: Document = {};
  const {group, id} = request.params;

  try {
    await mongo.init();
    response = await mongo.upsert('instances', {id, group},
      {
        updatedAt: Date.now(), meta: request.payload,
      },
      {
        id, group, createdAt: Date.now()
      });
    response = await response.value
  } catch (e) {
    return h.response(`Error on POST /v1/${group}/${id}: ${e}`).code(500);
  } finally {
    await mongo.close();
  }
  return h.response(response);
}
