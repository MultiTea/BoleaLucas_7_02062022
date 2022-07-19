import express from 'express';
import {
  deleteUser,
  followUser,
  unfollowUser,
  updateUser,
  userInfo,
  getAllUsers,
} from '../Controllers/UserController.js';
import authMiddleWare from '../Middleware/authMiddleware.js';

const router = express();

router.get('/', getAllUsers);
router.get('/:id', userInfo);
router.put('/:id', updateUser);
router.delete('/:id', authMiddleWare, deleteUser);
router.put('/:id/follow', authMiddleWare, followUser);
router.put('/:id/unfollow', authMiddleWare, unfollowUser);

export default router;
