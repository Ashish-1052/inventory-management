import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth";

export interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

// Authenticate JWT
export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  console.log('token', token);

  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (e) {
    console.log('error', e);
    return res.status(401).json({ error: "Invalid token" });
  }
};

// Authorize roles
export const authorize = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(403).json({ error: "Forbidden" });
    if (!roles.includes(req.user.role)) return res.status(403).json({ error: "Forbidden: Insufficient role" });
    next();
  };
};
