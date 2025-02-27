import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET || 'abfeeb25aee600bf733e54403c6bec1d28170e55b7d64c487f035993697486295b9c9f58b74d69c336cdde03afd121be63968cea4d443d54490fa5a1cb55c0a7';

// 🔹 CORS Middleware
export const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
};

// 🔹 JWT Authentication Middleware
export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        (req as any).user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid Token' });
    }
};

// 🔹 Hash Password
export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
};

// 🔹 Compare Password
export const comparePassword = async (inputPassword: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(inputPassword, hashedPassword);
};
