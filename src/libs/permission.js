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
