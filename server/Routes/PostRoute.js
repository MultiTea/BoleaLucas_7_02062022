import express from 'express';
import {
  createPost,
  deletePost,
  getPost,
  getTimelinePosts,
  likePost,
  updatePost,
} from '../Controllers/PostController.js';
import authMiddleWare from '../middleware/AuthMiddleware.js';
const router = express.Router();

router.post('/', createPost);
router.get('/:id', getPost);
router.put('/:id', authMiddleWare, updatePost);
router.delete('/:id', authMiddleWare, deletePost);
router.put('/:id/like', likePost);
router.get('/:id/timeline', getTimelinePosts);
export default router;
