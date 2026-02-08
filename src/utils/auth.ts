import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;

interface AccessTokenPayload {
  id: string;
  role: string;
}

interface RefreshTokenPayload {
  id: string;
}

// Hash a plain password
export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

// Compare plain password with hashed password
export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

// Generate JWT token
export const generateAccessToken = (payload: AccessTokenPayload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "15min" });
};

// Generate Refresh token
export const generateRefreshToken = (payload: RefreshTokenPayload) => {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });
};

// Verify JWT token
export const verifyToken = (token: string): AccessTokenPayload => {
  return jwt.verify(token, JWT_SECRET) as AccessTokenPayload;
};

// Verify Refresh token
export const verifyRefreshToken = (token: string): RefreshTokenPayload => {
  return jwt.verify(token, REFRESH_SECRET) as RefreshTokenPayload;
};
