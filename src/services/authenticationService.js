import User from "../models/users.js";
import Police from "../models/police.js";
import Admin from "../models/admin.js";
import validator from "validator";

/**
 * Service function to create a new user.
 * Validates the user data and saves it to the database.
 *
 * @param userData - The data of the user to be created
 * @returns The created user document
 * @throws Error if validation fails or user creation is unsuccessful
 */
const createUser = async (userData) => {
  try {
    // Validate email
    if (!validator.isEmail(userData.email)) {
      throw new Error("Invalid email format");
    }

    // Validate phone number
    if (!validator.isMobilePhone(userData.phone, "any")) {
      throw new Error("Invalid phone number");
    }

    // Validate Aadhar (assuming it should be a numeric string of 12 digits)
    if (
      !validator.isLength(userData.aadhar, { min: 12, max: 12 }) ||
      !validator.isNumeric(userData.aadhar)
    ) {
      throw new Error("Invalid Aadhar number");
    }

    // Create a new user instance
    const user = new User(userData);

    // Hash the password before saving
    user.password = await user.getHashedPassword(userData.password);

    // Save the user to the database
    const savedUser = await user.save();
    return savedUser;
  } catch (error) {
    throw new Error(`User creation failed: ${error.message}`);
  }
};

/**
 * Service function to create a new police user.
 * Validates the police data and saves it to the database.
 *
 * @param userData - The data of the police user to be created
 * @returns The created police user document
 * @throws Error if validation fails or police user creation is unsuccessful
 */
const createPolice = async (policeData) => {
  try {
    // Validate email
    if (!validator.isEmail(policeData.email)) {
      throw new Error("Invalid email format");
    }

    // Validate registration ID (assuming it should be a non-empty string)
    if (!policeData.regId || typeof policeData.regId !== "string") {
      throw new Error("Invalid registration ID");
    }

    // Create a new police instance
    const police = new Police(policeData);
    police.password = await police.getHashedPassword(police.password);

    // Save the police user to the database
    const savedPolice = await police.save();
    return savedPolice;
  } catch (error) {
    throw new Error(`Police user creation failed: ${error.message}`);
  }
};

/**
 * Service function to create a new police user.
 * Validates the police data and saves it to the database.
 *
 * @param userData - The data of the police user to be created
 * @returns The created police user document
 * @throws Error if validation fails or police user creation is unsuccessful
 */
const createAdmin = async (adminData) => {
  try {
    // Validate email
    if (!validator.isEmail(adminData.email)) {
      throw new Error("Invalid email format");
    }

    // Create a new police instance
    const admin = new Admin(adminData);
    admin.password = await admin.getHashedPassword(admin.password);

    // Save the police user to the database
    const savedPolice = await admin.save();
    return savedPolice;
  } catch (error) {
    throw new Error(`Police user creation failed: ${error.message}`);
  }
};

/**
 * Service function to log in a user.
 * Validates the user credentials and returns the user document if successful.
 *
 * @param email - The email of the user trying to log in
 * @param password - The password of the user trying to log in
 * @returns The user document if login is successful
 * @throws Error if login fails
 */
const loginUser = async (email, password) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    // Validate the password using the UserClass method
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    return user;
  } catch (error) {
    throw new Error(`Login failed: ${error.message}`);
  }
};

/**
 * Service function to log in a police user.
 * Validates the police credentials and returns the police document if successful.
 *
 * @param email - The email of the police user trying to log in
 * @param password - The password of the police user trying to log in
 * @returns The police user document if login is successful
 * @throws Error if login fails
 */
const loginPolice = async (email, password) => {
  try {
    // Find the police user by email
    const police = await Police.findOne({ email });
    if (!police) {
      throw new Error("Police user not found");
    }

    // Validate the password using the UserClass method
    const isPasswordValid = await police.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    return police;
  } catch (error) {
    throw new Error(`Login failed: ${error.message}`);
  }
};

/**
 * Service function to log in a police user.
 * Validates the police credentials and returns the police document if successful.
 *
 * @param email - The email of the police user trying to log in
 * @param password - The password of the police user trying to log in
 * @returns The police user document if login is successful
 * @throws Error if login fails
 */
const loginAdmin = async (email, password) => {
  try {
    // Find the admin user by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      throw new Error("Admin user not found");
    }

    // Validate the password using the UserClass method
    const isPasswordValid = await admin.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    return admin;
  } catch (error) {
    throw new Error(`Login failed: ${error.message}`);
  }
};

const getAdmin = async (_id) => {
  try {
    // Find the admin user by email
    const admin = await Admin.findById(_id);

    if (!admin) {
      throw new Error("Admin user not found");
    }

    return admin;
  } catch (error) {
    throw new Error(`Admin User found failed: ${error.message}`);
  }
};

const getPolice = async (_id) => {
  try {
    // Find the admin user by email
    const police = await Police.findById(_id);

    if (!police) {
      throw new Error("Police user not found");
    }

    return police;
  } catch (error) {
    throw new Error(`Police found failed: ${error.message}`);
  }
};

const getUser = async (_id) => {
  try {
    // Find the admin user by email
    const admin = await Admin.findById(_id);

    if (!admin) {
      throw new Error("User not found");
    }

    return admin;
  } catch (error) {
    throw new Error(`User found failed: ${error.message}`);
  }
};

// Export the service functions for use in controllers
export default {
  createUser,
  createAdmin,
  createPolice,

  loginUser,
  loginPolice,
  loginAdmin,

  getAdmin,
  getPolice,
  getUser,
};
