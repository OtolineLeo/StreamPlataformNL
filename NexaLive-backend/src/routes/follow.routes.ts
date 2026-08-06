import { Router } from 'express';
import { followController } from '../controllers/follow.controller';
import { ensureAuthenticated } from '../middlewares/ensure-authenticated';

export const followRouter = Router();

followRouter.post("/:username", ensureAuthenticated, followController.follow)
followRouter.delete("/:username", ensureAuthenticated, followController.unfollow)
followRouter.get("/:username/followers", followController.getFollowers)
followRouter.get("/:username/following", followController.getFollowing)
