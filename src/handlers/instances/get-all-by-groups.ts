import { Request, ResponseObject, ResponseToolkit } from '@hapi/hapi';
import { Document } from 'mongodb';
import mongo from '../../lib/mongo';

export async function getAllByGroups(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
  let response: Document = [];
  const {group} = request.params;

  try {
    await mongo.init();

    response = await mongo.find('instances', group ? {group} : {});

    if (!group) {
      const aggregation = await mongo.aggregate('instances', queryAgg());
      response = await aggregation.toArray();
    }
  } catch (e) {
    return h.response(`Error on GET /v1/{group?}: ${e}`).code(500);
  } finally {
    await mongo.close();
  }
  return h.response(response);
}

function queryAgg(): Document[] {
  return [
    {
      $group: {
        _id: '$group',
        count: {
          $count: {},
        },
        createdAt: {
          $min: '$createdAt',
        },
        updatedAt: {
          $max: '$updatedAt',
        },
      },
    }, {
      $match: {
        count: {
          $gte: 1,
        }
      },
    },
  ];
}
