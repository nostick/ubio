import { Request, ResponseObject, ResponseToolkit } from '@hapi/hapi';
import mongo from '../../lib/mongo';
import { Document } from 'mongodb';

export async function deleteInstance(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
  const {group, id} = request.params;
  let response: Document = {};

  try {
    await mongo.init();
    response = await mongo.delete('instances', {group, id});
  } catch (e) {
    return h.response(`Error on DELETE /v1/${group}/${id}: ${e}`).code(500);
  } finally {
    await mongo.close();
  }
  return h.response(response);
}
