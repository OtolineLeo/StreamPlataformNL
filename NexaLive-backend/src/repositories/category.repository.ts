import { prisma } from "../config/prisma";
import { CreateCategoryDto } from "../dtos/create-category.dto";

type CreateCategoryData = CreateCategoryDto & { slug: string };
type UpdateCategoryData = Partial<CreateCategoryDto> & { slug?: string };

// FUNÇÃO PARA REMOVER AUTOMATICAMENTE QUALQUER CHAVE QUE SEJA UNDEFINED
function removeUndefined<T extends object>(obj: T): T {
    return Object.fromEntries(
        Object.entries(obj).filter(([, value]) => value !== undefined)
    ) as T;
}

export const categoryRepository = {
    create(data: CreateCategoryData) {
        return prisma.category.create({ data: {
            name: data.name,
            coverUrl: data.coverUrl,
            slug: data.slug,
            ...(data.description !== undefined && {description: data.description})
        },
      });
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

    // PARA ENCONTRAR TUDO E TODOS
    findAll() {
        return prisma.category.findMany();
    },

    updateById(id: string, data: UpdateCategoryData) {
        return prisma.category.update({
            where: {id},
            data: removeUndefined(data),
        });
    },

    deleteById(id: string) {
        return prisma.category.delete({ where: { id } });
    }
};