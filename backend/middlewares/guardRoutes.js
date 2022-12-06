import { verifyJwtAccessToken } from "../utils/token.js";
import User from "../models/User.js";

const resourceErrorMsg = `You don't have permission to access resources!`;

async function ensureAuth(req, res, next) {
  try {
    //get token from headers
    let tokenHeaders =
      req.headers["Authorization"] || req.headers["authorization"];
    if (!tokenHeaders) throw Error("No Token Headers Found");

    let token = tokenHeaders.split("Bearer ")[1];
    if(!token) throw Error('No Token found!')
    //verfiy token it is still valid
    let decoded = await verifyJwtAccessToken(token);
    //find user
    req.user = await User.findById(decoded["userInfo"]?.id).orFail();
    next();
  } catch (error) {
    res.status(403).json({
      error: error.message,
    });
  }
}

// middeware for ensuring user has admin role
async function ensureAdmin(req, res, next) {
  try {
    //get  user
    //extract user from req object
    const user = req.user;
    if (!user) throw Error("Failed while getting credentials!");
    //check his roles
    if (!(user.role !== "ADMIN" || user.role !=="SUPERADMIN" )) throw Error(resourceErrorMsg);
    next();
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
}

// middleware for ensuring user has superAdmin role
async function ensureSuperAdmin(req, res, next) {
  try {
    //get  user
    //extract user from req object
    const user = req.user;
    if (!user) throw Error("Failed while getting admin credentials!");
    //check his roles
    if (user.role !== "SUPERADMIN") throw Error(resourceErrorMsg);
    next();
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
}

const adminMiddewares = [ensureAuth, ensureAdmin];
const superAdminMiddlewares = [ensureAuth, ensureSuperAdmin];

export {
  ensureAuth,
  ensureAdmin,
  ensureSuperAdmin,
  adminMiddewares,
  superAdminMiddlewares,
};
