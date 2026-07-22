import { prisma } from "../config/prisma";
import { CreateUserDto } from "../dtos/create-users.dto";

type CreateUserData = Omit<CreateUserDto, "password"> & { passwordHash: string };

export const usersRepository = {
    create(data: CreateUserData) {
        return prisma.user.create({ data })
    },
    
    // PARA UM USUARIO ENCONTRAR OUTRO USUARIO

    findByName(username: string) {
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

    findByEmail(email: string) {
        return prisma.user.findUnique({ where: {email} });
    },

    findById(id: string) {
        return prisma.user.findUnique({ where: {id} });
    },

    findAll() {
        return prisma.user.findMany();
    },

    // NÃO SEI SE FICARÁ AQUI

    updateById(id: string, data: Partial<CreateUserData>) {
        return prisma.user.update({ where: {id}, data });
    },

    deleteById(id: string) {
        return prisma.user.delete({ where: {id}});
    }

};