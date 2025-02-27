import express from 'express';
import { getUserById } from '../service/userService';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = express.Router();

// 🔹 Get User by ID (Protected)
router.get('/:id', authenticateJWT, async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const user = await getUserById(userId);
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
