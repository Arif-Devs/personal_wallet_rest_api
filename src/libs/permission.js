import Permission from '../model/permission';
import { notFoundError, serverError } from '../utils/error';
import PermissionRole from '../model/permissionRole';
import { generateSortType } from '../utils/query';

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
