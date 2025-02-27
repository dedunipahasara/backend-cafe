import prisma from '../config/database';

export const getUserById = async (userId: number) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
        throw new Error('User not found');
    }

    return user;
};
