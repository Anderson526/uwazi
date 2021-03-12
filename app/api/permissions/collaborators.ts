import users from 'api/users/users';
import userGroups from 'api/usergroups/userGroups';
import { PermissionType } from 'shared/types/permissionSchema';
import { MemberWithPermission } from 'shared/types/entityPermisions';
import { GroupMemberSchema } from 'shared/types/userGroupType';

export const collaborators = {
  search: async (filterTerm: string) => {
    const exactFilterTerm = new RegExp(`^${filterTerm}$`, 'i');
    const partialFilterTerm = new RegExp(`^${filterTerm}`, 'i');

    const matchedUsers = await users.get({
      $or: [{ email: exactFilterTerm }, { username: exactFilterTerm }],
    });
    const groups = await userGroups.get({ name: { $regex: partialFilterTerm } });

    const availableCollaborators: MemberWithPermission[] = [];

    matchedUsers.forEach((user: GroupMemberSchema) => {
      availableCollaborators.push({
        refId: user._id,
        type: PermissionType.USER,
        label: user.username!,
      });
    });

    groups.forEach(group => {
      availableCollaborators.push({
        refId: group._id!.toString(),
        type: PermissionType.GROUP,
        label: group.name,
      });
    });

    return availableCollaborators;
  },
};
