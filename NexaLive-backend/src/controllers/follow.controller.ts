import { Request, Response } from 'express';
import { followService } from '../services/follow.service';
import { usersRepository } from '../repositories/users.repository';
import { NotFoundError } from '../common/errors/app-error';

export const followController = {
    async follow(req: Request, res: Response){
        const { username } = req.params;

        if(!username || typeof username !== 'string') {
            return res.status(400).json({ message: "Username inválido." })
        }

        const userToFollow = await usersRepository.findByName(username);

        if(!userToFollow) {
            throw new NotFoundError("Ususrio não encontrado.");
        }

        const follow = await followService.follow(req.userId as string, userToFollow.id);
        return res.status(201).json(follow);
    },

    async unfollow(req: Request, res: Response){
        const { username } = req.params;

        if(!username || typeof username !== 'string') {
            return res.status(400).json({ message: "Username inválido." })
        }

        const userToUnfollow = await usersRepository.findByName(username);

        if(!userToUnfollow) {
            throw new NotFoundError("Ususrio não encontrado.");
        }

        const follow = await followService.unfollow(req.userId as string, userToUnfollow.id);
        return res.status(200).json(follow);
    },

    async getFollowers(req: Request, res: Response) {
        const { username } = req.params;

        if(!username || typeof username !== 'string') {
            return res.status(400).json({ message: "Username inválido." })
        }

        const user = await usersRepository.findByName(username);

        if(!user) {
            throw new NotFoundError("Usuario não encontrado.");
        }

        const followers = await followService.getFollowers(user.id);
        return res.status(200).json(followers);
    },

    async getFollowing(req: Request, res: Response) {
        const { username } = req.params;

        if(!username || typeof username !== 'string') {
            return res.status(400).json({ message: "Username inválido." })
        }

        const user = await usersRepository.findByName(username);

        if(!user) {
            throw new NotFoundError("Usuario não encontrado.");
        }

        const following = await followService.getFollowing(user.id);
        return res.status(200).json(following);
    }
}