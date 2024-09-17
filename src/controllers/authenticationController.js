import authenticationService from "../services/authenticationService.js";
import jwt from "jsonwebtoken";

/**
 * Controller function to create a new user.
 *
 * @param req 
    - mail
    - phone
    - password
    - account type = user // enum -> user/police/admin
    - gender
    - Aadhar
    - emergency contact
    --  name, phone numbers, email
- 
 * @param res - Express response object used to send back the HTTP response
 */
const register = async (req, res) => {
  try {
    const { data, accountType } = req.body;

    let returnData;
    if (accountType == "POLICE")
      returnData = await authenticationService.createPolice(data);
    else if (accountType == "USER")
      returnData = await authenticationService.createUser(data);
    else if (accountType == "ADMIN")
      returnData = await authenticationService.createAdmin(data);

    const token = createToken(returnData._id, accountType);

    res.status(201).json({
      status: true,
      message: accountType + " Registration successfully",
      returnData,
      token,
    });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

/**
 * Controller function to retrieve all users.
 *
 * @param req - Express request object
 * @param res - Express response object used to send back the HTTP response
 */
const login = async (req, res) => {
  try {
    const { data, accountType } = req.body;
    const { email, password } = data;

    let returnData;
    if (accountType == "POLICE")
      returnData = await authenticationService.loginPolice(email, password);
    else if (accountType == "USER")
      returnData = await authenticationService.loginUser(email, password);
    else if (accountType == "ADMIN")
      returnData = await authenticationService.loginAdmin(email, password);

    const token = createToken(returnData._id, accountType);

    res.status(200).json({
      status: true,
      message: accountType + " Login successfully",
      returnData,
      token,
    });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

const profile = async (req, res) => {
  try {
    const { userToken } = req.body;

    const extractedData = extractDataFromToken(userToken);
    const { _id, accountType } = extractedData;

    let returnData;
    if (accountType == "POLICE")
      returnData = await authenticationService.getPolice(_id);
    else if (accountType == "USER")
      returnData = await authenticationService.getUser(_id);
    else if (accountType == "ADMIN")
      returnData = await authenticationService.getAdmin(_id);

    res.status(200).json({
      status: true,
      message: accountType + " Login successfully",
      returnData,
    });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

const createToken = (_id, accountType) => {
  return jwt.sign({ _id, accountType }, "AuthSecreateKey", { expiresIn: "5d" });
};

const extractDataFromToken = (token) => {
  try {
    // Decode the token without verifying to check the expiration
    const decoded = jwt.decode(token, { complete: true });

    // Check if the token is expired
    if (decoded && decoded.payload.exp * 1000 < Date.now()) {
      return "expired token";
    }

    // Verify and decode the token using the secret key
    const verifiedDecoded = jwt.verify(token, "AuthSecreateKey");
    return verifiedDecoded; // Return the payload if the token is valid
  } catch (error) {
    // Handle token verification errors
    console.error("Invalid token:", error.message);
    return null;
  }
};

export default { register, login, profile };
