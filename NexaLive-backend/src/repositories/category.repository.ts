import { prisma } from "../config/prisma";
import { CreateCategoryDto } from "../dtos/create-category.dto";

type CreateCategoryData = CreateCategoryDto & { slug: string };
type UpdateCategoryData = Partial<CreateCategoryDto> & { slug?: string };

export const categoryRepository = {
    create(data: CreateCategoryData) {
        return prisma.category.create({ data });
    },

    //AMIGAVEL PARA O USUARIO, PARA ENCONTRAR CATEGORIA PELO SLUG, CONSIDERANDO MUDAR OU ADICIONAR NOME

    findBySlug(slug: string) {
        return prisma.category.findUnique({ where: { slug } });
    },

    // SEARCH PARA ACHAR TODOS OS CATEGORIAS 

    search(query: string) {
        return prisma.category.findMany({
            where: {
                // OR: [
                //     { name: { contains: query, mode: "insensitive" } },
                //     { description: { contains: query, mode: "insensitive" } },
                // ],
                name: {
                    contains: query,
                    mode: "insensitive",
                }
            },
        });
    },

    //INTERNAMENTE PARA O SISTEMA, PARA ENCONTRAR, ATUALIZAR E DELETAR CATEGORIA PELO ID

    findById(id: string) {
        return prisma.category.findUnique({ where: { id } });
    },

    updateById(id: string, data: UpdateCategoryData) {
        return prisma.category.update({ where: { id }, data });
    },

    deleteById(id: string) {
        return prisma.category.delete({ where: { id } });
    }
};