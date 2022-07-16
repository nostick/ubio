import { Request, ResponseObject, ResponseToolkit } from '@hapi/hapi';
import mongo from '../../lib/mongo';

export async function insertInstanceWithGroup(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
  let response: any;
  try {
    const {group, id} = request.params;

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
    console.log('Error on insertInstanceWithGroup Route', e);
  } finally {
    await mongo.close();
  }
  return h.response(response);
}
