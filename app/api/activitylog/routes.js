import { objectIdSchema } from 'shared/types/commonSchemas';
import { parseQuery, validation } from '../utils';
import needsAuthorization from '../auth/authMiddleware';
import headersMiddleware from '../auth/headersMiddleware';
import activitylog from './activitylog';

export default app => {
  app.get(
    '/api/activitylog',
    headersMiddleware,
    needsAuthorization(['admin']),
    parseQuery,
    validation.validateRequest({
      properties: {
        query: {
          additionalProperties: false,
          properties: {
            user: objectIdSchema,
            username: { type: 'string' },
            find: { type: 'string' },
            time: {
              properties: {
                from: { type: 'number' },
                to: { type: 'number' },
              },
            },
            before: { type: 'number' },
            limit: { type: 'number' },
            method: { type: 'array', items: { type: 'string' } },
            search: { type: 'string' },
          },
        },
      },
    }),
    (req, res, next) =>
      activitylog
        .get(req.query)
        .then(response => res.json(response))
        .catch(next)
  );
};
