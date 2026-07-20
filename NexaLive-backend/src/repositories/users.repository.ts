import { prisma } from "../config/prisma";
import { CreateUserDto } from "../dtos/users.dto";

type CreateUserData = CreateUserDto;

export const usersRepository = {
    
    // PARA UM USUARIO ENCONTRAR OUTRO USUARIO

    findbyName(username: string) {
        return prisma.user.findUnique({ where: {username}});
    },

    // PARA ENCONTRAR COLOCANDO UMA LETRA E RETORNANDO TUDO POR INTEIRO

    search(query: string) {
        return prisma.user.findMany({
            where: {
                username: {
                    contains: query,
                    mode: "insensitive"
                }
            }
        });
    },

    // PARA ENCONTRAR CONSULTAS INTERNAS

    findbyId(id: string) {
        return prisma.user.findUnique({ where: {id} });
    },

    findAll() {
        return prisma.user.findMany();
    },

    // NÃO SEI SE FICARÁ AQUI

    updatebyId(id: string, data: CreateUserData) {
        return prisma.user.update({ where: {id}, data });
    },

    deletebyId(id: string) {
        return prisma.user.delete({ where: {id}});
    }

};