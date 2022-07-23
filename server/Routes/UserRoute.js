import express from 'express';
import {
  deleteUser,
  followUser,
  unfollowUser,
  updateUser,
  getUser,
  getAllUsers,
} from '../Controllers/UserController.js';
import authMiddleWare from '../middleware/AuthMiddleware.js';

const router = express();

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', authMiddleWare, deleteUser);
router.put('/:id/follow', authMiddleWare, followUser);
router.put('/:id/unfollow', authMiddleWare, unfollowUser);

export default router;
