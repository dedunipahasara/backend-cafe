// src/controllers/authController.ts
import { Request, Response } from 'express';
import * as authService from '../service/authService';

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const token = await authService.login(username, password);
        res.json({ success: true, token });
    } catch (error: any) {
        res.status(401).json({ success: false, message: error.message });
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const { username, password, email } = req.body;
        const user = await authService.register(username, password, email);
        res.status(201).json({ success: true, user });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
};