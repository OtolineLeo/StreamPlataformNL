import { usersRepository } from "../repositories/users.repository";
import { CreateUserDto } from "../dtos/create-users.dto";
import { ConflictError, NotFoundError } from "../common/errors/app-error";
import bcrypt from "bcryptjs";

export type UpdateUserDto = Partial<Omit<CreateUserDto, "password">>;

export function toPublicUser<T extends { passwordHash: string }>(user:T){
    const {passwordHash, ...publicUser} = user;
    return publicUser;
}

export const usersService = {

    // VERIFICA SE JA EXISTE USUARIO, EMIALS REPETIDOS E CRIPTA A SENHA
    async create(data: CreateUserDto) {
        const existingUsers = await usersRepository.findByName(data.username)
        if (existingUsers) {
            throw new ConflictError("Username já existe")
        }

        const existingEmails = await usersRepository.findByEmail(data.email)
        if (existingEmails) {
            throw new ConflictError("Email já existe")
        }

        const passwordHash = await bcrypt.hash(data.password, 12);

        const user = await usersRepository.create({
            username: data.username,
            email: data.email,
            passwordHash,
            bio: data.bio,
            avatarUrl: data.avatarUrl,
        });

        return toPublicUser(user);
    },

    async deleteById(id: string) {
        const existingUsers = await usersRepository.findById(id);

        if(!existingUsers) {
            throw new NotFoundError("Resource not found or does not exist.");
        }

        const deletedUser = await usersRepository.deleteById(id);
        return toPublicUser(deletedUser);
    },

    async updateById(id: string, data: UpdateUserDto ) {
        const existingUsers = await usersRepository.findById(id);

        if(!existingUsers) {
            throw new NotFoundError("Resource not found or does not exist.");
        }

        const updatedUser = await usersRepository.updateById(id, data);
        return toPublicUser(updatedUser);
    },

    async search(query: string){
        const users = await usersRepository.search(query);
        return users.map(toPublicUser);
    },

    async findAll() {
        const users = await usersRepository.findAll();
        return users.map(toPublicUser);
    },

    async findById(id: string) {
        const users = await usersRepository.findById(id);

        if(!users) {
            throw new NotFoundError("Resource not found or does not exist.");
        }
        return toPublicUser(users);
    }

}