import { Request, Response } from 'express';
import * as userService from '../service/userService';

export const getUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);
        const user = await userService.getUserById(userId);
        res.json(user);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};