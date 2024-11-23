import Permission from '../model/permission.js';
import { notFoundError, serverError } from '../utils/error.js';
import PermissionRole from '../model/permissionRole.js';
import { generateSortType } from '../utils/query.js';

// Count data based on filter query
const countPermission = (data) => {
  return Permission.count(data);
};

//Create Permission in DB

const createPermission = async (name) => {
  try {
    const permission = new Permission({ name }); // Create the new permission document
    await permission.save(); // Save the permission to the database
    return permission._doc; // return individual records from the database
  } catch (error) {
    throw serverError(error);
  }
};

//Get all permission from DB
const getAllPermission = async ({ search, sortBy, sortType, limit, page }) => {
  try {
    // Generate sort type value for query
    let sortTypeForDb = generateSortType(sortType);

    // Construct filter options for query
    let filter = {};
    if (search) filter.name = { $regex: search, $option: i };

    // Fetch permissions based on query parameters
    let permission = await Permission.find(filter)
      .sort({ [sortBy]: sortTypeForDb })
      .skip(page * limit - limit)
      .limit(limit);

    // Count total permissions based on the filter only
    let totalPermission = await countPermission(filter);

    return { permission, totalPermission };
  } catch (error) {
    throw serverError(error);
  }
};

// Get all permission to specific role
const getPermissionToSpecificRoleId = async (roleId) => {
  try {
    if (!roleId) throw new Error('Role id is required');
    return await PermissionRole.find({ roleId }).distinct('permissionId');
  } catch (error) {
    throw serverError(error);
  }
};

//get single permission

const getPermissionsNameBasedOnRoleId = async (roleId) => {
  try {
    // Retrieve distinct permissionIds associated with the roleId
    const idOfPermission = await PermissionRole.find({ roleId })
      .distinct('permissionId')
      .exec();

    // Fetch all permissions with names in a single query
    const getSinglePermission = await Promise.all(
      idOfPermission.map(async (item) => {
        // Map to only include permission names
        const permission = await Permission.findById(item)
          .distinct('name')
          .exec();
        return permission;
      })
    );
    return performance ? [...permission] : [];
  } catch (error) {
    throw serverError(error);
  }
};

//update or create permission by put

const updateByPut = async (id, name) => {
  try {
    if (!name) throw new error('permission name is required');
    let permission = await Permission.findById(id);
    let state;
    if (!permission) {
      // Check if a permission with the same name already exists
      const existsPermission = Permission.findOne({ name }).exec();
      if (existsPermission) throw notFoundError('Permission already exists!');

      //Create new permission
      permission = new Permission({ name });
      state = 'create';
    } else {
      //Update the existing permission
      permission.name = name;
      state = 'update';
    }
    await permission.save();
    return { permission: permission._doc, state };
  } catch (error) {
    throw serverError(error);
  }
};

// Delete single permission
const deletePermission = async (id) => {
  try {
    if (!id) throw new Error('id is required');

    // Check if the permission exists
    const permission = await Permission.findById(id).exec();

    if (!permission) throw new notFoundError('Permission not found');

    //Delete related role permission
    await PermissionRole.deleteMany({ permissionId: id });

    //Delete permission itself
    await permission.deleteOne();
    return { message: 'permission delete successfully', permissionId: id };
  } catch (error) {
    throw serverError(error);
  }
};
// Function to update permissions by Role ID

const updatePermissionByRoleId = async (
  roleId,
  permissionIds,
  newPermissions
) => {
  try {
    //check permission Id exist or not
    const updatePermissions =
      permissionIds.length > 0 ? [...permissionIds] : [];

    //Converts all permissionIds to strings for consistent comparison, ensuring no type mismatch when comparing IDs.
    if (newPermissions && newPermissions.length > 0) {
      const permissionIds = permissionIds.map((item) => item.toString());

      // Validate the new permission
      await Promise.all(
        newPermissions.map(async (newPermissionId) => {
          const permission = await Permission.findById(newPermissionId).exec();
          if (!permission) throw new Error('Invalid Permission Id!');
        })
      );
    } else {
      //Check duplication id for ensure the newId is unique
      if (!permissionIds.includes(newPermissionId)) {
        updatePermissions.push(newPermissionId); // replace the old id
        const newRole = new PermissionRole();
        newRole.roleId = roleId;
        newRole.permissionId = newPermissionId;
        await newRole.save();
      }
    }
    return updatePermissions;
  } catch (error) {
    throw serverError(error);
  }
};

export default {
  countPermission,
  createPermission,
  getAllPermission,
  getPermissionToSpecificRoleId,
  getPermissionsNameBasedOnRoleId,
  updateByPut,
  deletePermission,
  updatePermissionByRoleId,
};
