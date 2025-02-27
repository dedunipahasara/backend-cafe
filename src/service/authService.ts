import prisma from '../config/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'abfeeb25aee600bf733e54403c6bec1d28170e55b7d64c487f035993697486295b9c9f58b74d69c336cdde03afd121be63968cea4d443d54490fa5a1cb55c0a7';

// 🔹 Register User
export const register = async (username: string, password: string, email: string) => {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
        throw new Error('User already exists with this email');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.create({
        data: {
            username,
            password: hashedPassword,
            email,
        },
    });
};

// 🔹 Login User
export const login = async (email: string, password: string): Promise<string> => {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }

    return jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
};
