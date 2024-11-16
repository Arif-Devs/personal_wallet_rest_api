import Permission from '../model/permission';
import { notFoundError, serverError } from '../utils/error';
import PermissionRole from '../model/permissionRole';
import { generateSortType } from '../utils/query';

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

//update by put

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
