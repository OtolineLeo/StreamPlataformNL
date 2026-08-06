import { prisma } from "../config/prisma";

export const followRepository = {
    create(followerId: string, followingId: string) {
        return prisma.follow.create({ data: {
                followerId: followerId,
                followingId: followingId
            },
        });
    },

    findByIds(followerId: string, followingId: string) {
        return prisma.follow.findFirst({
            where: { followerId, followingId },
        });
    },

    // delete, findFollowing, findFollowers.

    findFollowing(userId: string){
        return prisma.follow.findMany({
            where: { followerId: userId }
        });
    },

    deleteByIds(followerId: string, followingId: string) {
        return prisma.follow.deleteMany({
            where: { followerId, followingId }
        })
    },

    findFollowers(userId: string) {
        return prisma.follow.findMany({
            where: { followingId: userId }
        });
    },

    
}