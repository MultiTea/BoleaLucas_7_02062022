import express from 'express';
import {
  deleteUser,
  followUser,
  unfollowUser,
  updateUser,
  getUser,
  getAllUsers,
} from '../Controllers/UserController.js';

const router = express();

router.get('/', getAllUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.put('/:id/follow', followUser);
router.put('/:id/unfollow', unfollowUser);

export default router;
