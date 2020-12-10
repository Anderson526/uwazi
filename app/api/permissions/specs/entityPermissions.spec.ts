import entities from 'api/entities/entities';
import { entitiesPermissions } from 'api/permissions/entitiesPermissions';
import fixtures, { userA } from 'api/permissions/specs/fixtures';
import db from 'api/utils/testing_db';

describe('permissions', () => {
  beforeEach(async () => {
    await db.clearAllAndLoad(fixtures);
  });

  describe('set entities permissions', () => {
    it('should update the specified entities with the passed permissions', async () => {
      const permissionsData = {
        ids: ['shared1', 'shared2'],
        permissions: [{ _id: 'user1', type: 'user', level: 'read' }],
      };
      await entitiesPermissions.setEntitiesPermissions(permissionsData, 'en');
      const storedEntities = await entities.get();
      expect(storedEntities[0].permissions).toEqual(permissionsData.permissions);
      expect(storedEntities[1].permissions).toEqual(permissionsData.permissions);
      expect(storedEntities[2].permissions).toBe(undefined);
    });
  });

  describe('get entities permissions', () => {
    it('should return the permissions of the requested entities', async () => {
      const permissions = await entitiesPermissions.getEntitiesPermissions({
        id: ['shared1', 'shared2'],
      });
      expect(permissions[0]).toEqual({
        _id: userA._id,
        label: userA.username,
        level: 'read',
        type: 'user',
      });
    });
  });
});
