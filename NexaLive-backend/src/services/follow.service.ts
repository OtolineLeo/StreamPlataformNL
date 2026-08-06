import { followRepository } from "../repositories/follow.repository";
import { AppError, ConflictError, NotFoundError } from "../common/errors/app-error";

export const followService = {
    async follow(followerId: string, followingId: string) {
        if(followerId === followingId){
            throw new AppError("Você não pode seguir a si mesmo.");
        }

        const existingFollow = await followRepository.findByIds(followerId, followingId);
    
        if(existingFollow){
            throw new ConflictError("Você já está seguindo esse usuário.");
        }

        const follow = await followRepository.create(followerId, followingId);
        return follow;
    },

    async unfollow(followerId: string, followingId: string){

        const existingFollow = await followRepository.findByIds(followerId, followingId);
        
        if(!existingFollow){
            throw new NotFoundError("Você não está seguindo esse usuário.");
        }

        const unfollow = await followRepository.deleteByIds(followerId, followingId);
        return unfollow;
    },

    async getFollowing(userId: string){
        const following = await followRepository.findFollowing(userId);
        return following;
    },

    async getFollowers(userId: string){
        const followers = await followRepository.findFollowers(userId);
        return followers;
    },

}