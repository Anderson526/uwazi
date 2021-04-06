import entities from 'api/entities/entities';
import users from 'api/users/users';
import userGroups from 'api/usergroups/userGroups';
import { unique } from 'api/utils/filters';
import { GroupMemberSchema, UserGroupSchema } from 'shared/types/userGroupType';
import { EntitySchema } from 'shared/types/entityType';
import {
  AccessLevels,
  PermissionType,
  MixedAccess,
  validateUniquePermissions,
} from 'shared/types/permissionSchema';
import { PermissionSchema } from 'shared/types/permissionType';
import { MemberWithPermission } from 'shared/types/entityPermisions';
import { ObjectIdSchema } from 'shared/types/commonTypes';

const setAdditionalData = (
  referencedList: { _id: ObjectIdSchema }[],
  permission: PermissionSchema,
  additional: (data: { _id: ObjectIdSchema }) => {}
) => {
  const referencedData = referencedList.find(
    u => u._id!.toString() === permission.refId.toString()
  );
  return referencedData ? { ...permission, ...additional(referencedData) } : undefined;
};

async function setAccessLevelAndPermissionData(
  grantedPermissions: { [p: string]: { permission: PermissionSchema; access: AccessLevels[] } },
  entitiesPermissionsData: (PermissionSchema[] | undefined)[]
) {
  const grantedIds = Object.keys(grantedPermissions);
  const [usersData, groupsData] = await Promise.all([
    users.get({ _id: { $in: grantedIds } }),
    userGroups.get({ _id: { $in: grantedIds } }),
  ]);

  const permissionsData = Object.keys(grantedPermissions).map(id => {
    const differentLevels = grantedPermissions[id].access.filter(unique);
    const level =
      grantedPermissions[id].access.length !== entitiesPermissionsData.length ||
      differentLevels.length > 1
        ? MixedAccess.MIXED
        : differentLevels[0];
    const sourceData =
      grantedPermissions[id].permission.type === PermissionType.USER ? usersData : groupsData;
    const additional =
      grantedPermissions[id].permission.type.toString() === PermissionType.USER
        ? (p: any) => ({ label: p.username })
        : (g: any) => ({ label: g.name });
    return {
      ...setAdditionalData(sourceData, grantedPermissions[id].permission, additional),
      level,
    } as MemberWithPermission;
  });

  return permissionsData.filter(p => p.refId !== undefined);
}

export const entitiesPermissions = {
  set: async (permissionsData: any) => {
    await validateUniquePermissions(permissionsData);
    const currentEntities = await entities.get(
      { sharedId: { $in: permissionsData.ids } },
      '_id,+permissions'
    );

    const toSave = currentEntities.map(entity => ({
      _id: entity._id,
      permissions: permissionsData.permissions,
    }));
    await entities.saveMultiple(toSave);
  },

  get: async (sharedIds: string[]) => {
    const entitiesPermissionsData = (
      await entities.get({ sharedId: { $in: sharedIds } }, { permissions: 1 })
    ).map((entity: EntitySchema) => entity.permissions);

    const grantedPermissions: {
      [k: string]: { permission: PermissionSchema; access: AccessLevels[] };
    } = {};
    entitiesPermissionsData
      .filter(p => p)
      .forEach(entityPermissions => {
        entityPermissions!.forEach(permission => {
          const grantedPermission = grantedPermissions[permission.refId.toString()];
          if (grantedPermission) {
            grantedPermission.access.push(permission.level as AccessLevels);
          } else {
            grantedPermissions[permission.refId.toString()] = {
              permission,
              access: [permission.level as AccessLevels],
            };
          }
        });
      });

    const permissions: MemberWithPermission[] = await setAccessLevelAndPermissionData(
      grantedPermissions,
      entitiesPermissionsData
    );

    return permissions.sort((a: MemberWithPermission, b: MemberWithPermission) =>
      (a.type + a.label).localeCompare(b.type + b.label)
    );
  },
};
