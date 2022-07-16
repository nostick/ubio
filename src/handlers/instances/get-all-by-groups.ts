import { Request, ResponseObject, ResponseToolkit } from '@hapi/hapi';
import { Document } from 'mongodb';
import mongo from '../../lib/mongo';

export async function getAllByGroups(request: Request, h: ResponseToolkit): Promise<ResponseObject> {
  let response;
  try {
    const {group} = request.params;
    await mongo.init();

    response = await mongo.find('instances', group ? {group} : {});

    if (!group) {
      const aggregation = await mongo.aggregate('instances', queryAgg());
      response = await aggregation.toArray();
    }
  } catch (e) {
    console.log('Error on getAll Route', e);
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
        },
      },
    },
  ];
}
