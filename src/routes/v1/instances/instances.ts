import { ServerRoute } from '@hapi/hapi';
import {
  deleteInstance,
  getAllByGroups,
  insertInstanceWithGroup,
} from '../../../handlers/instances/handlers';
import Joi from 'joi';

export default [
  {
    method: 'GET',
    path: '/{group?}',
    handler: getAllByGroups,
  },
  {
    method: 'POST',
    path: '/{group}/{id}',
    handler: insertInstanceWithGroup,
    options: {
      validate: {
        params: Joi.object({
          group: Joi.string().required().min(3).max(16),
          id: Joi.string().guid().required()
        }),
      },
    },
  },
  {
    method: 'DELETE',
    path: '/{group}/{id}',
    handler: deleteInstance,
    options: {
      validate: {
        params: Joi.object({
          group: Joi.string().required().min(3).max(16),
          id: Joi.string().guid().required()
        }),
      },
    },
  },
] as ServerRoute[];
