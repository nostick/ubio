import { Request, ResponseObject, ResponseToolkit } from '@hapi/hapi';
import mongo from '../../lib/mongo';

export async function deleteInstance(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
  let response: any;
  try {
    const {group, id} = request.params;

    await mongo.init();
    response = await mongo.delete('instances', {group, id});
  } catch (e) {
    console.log("Error on getAll Route", e);
  } finally {
    await mongo.close();
  }
  return h.response(response);
}
