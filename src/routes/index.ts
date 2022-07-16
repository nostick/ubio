import { ServerRoute } from '@hapi/hapi';

import v1Routes from './v1';

function prefixed(prefix: string, routes: ServerRoute[]): ServerRoute[] {
  return routes.map(r => {
    r.path = `${prefix}${r.path}`
    return r;
  });
}

export default [
  ...prefixed('/v1', v1Routes)
];
