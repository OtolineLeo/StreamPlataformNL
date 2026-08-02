import { categoryRepository } from "../repositories/category.repository";
import { CreateCategoryDto } from "../dtos/create-category.dto";
import { ConflictError, NotFoundError } from "../common/errors/app-error";
import { fetchGames } from "../integrations/idgb.service";

// GERA O SLUG A PARTIR DO NOME DA CATEGORIA, REMOVENDO ACENTOS E CARACTERES ESPECIAIS, E SUBSTITUINDO ESPAÇOS POR HÍFENS
function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .trim()
        .replace(/(^-|-$)+/g, "");
}

export const categoryService = {
    // CRIA UMA NOVA CATEGORIA, VERIFICANDO SE JÁ EXISTE UMA CATEGORIA COM O MESMO SLUG
    async create(data: CreateCategoryDto) {
        const slug = generateSlug(data.name);
        const existingCategory = await categoryRepository.findBySlug(slug);

        if (existingCategory) {
            throw new ConflictError("Category already exists.");
        }

        const category = await categoryRepository.create({ ...data, slug });
        return category;
    },

    // DELETA UMA CATEGORIA PELO ID, VERIFICANDO SE A CATEGORIA EXISTE
    async deleteById(id: string) {
        const existingCategory = await categoryRepository.findById(id);

        if(!existingCategory) {
            throw new NotFoundError("Resource not found or does not exist.");
        }

        const deletedCategory = await categoryRepository.deleteById(id);
        return deletedCategory;
    },

    // ATUALIZA UMA CATEGORIA PELO ID, VERIFICANDO SE A CATEGORIA EXISTE
    async updateById(id: string, data: Partial<CreateCategoryDto>) {
        const existingCategory = await categoryRepository.findById(id);

        if (!existingCategory) {
            throw new NotFoundError("Resource not found or does not exist.");
        }

        // SE O NOME FOR ALTERADO, GERA UM NOVO SLUG E VERIFICA SE JÁ EXISTE UMA CATEGORIA COM O MESMO SLUG
        let slug: string | undefined;
        if (data.name) {
            slug = generateSlug(data.name);
            const categoryWithSameSlug = await categoryRepository.findBySlug(slug);

            if(categoryWithSameSlug && categoryWithSameSlug.id !== id) {
                throw new ConflictError("Category with the same name already exists.");
            }
        }

        const updatedCategory = await categoryRepository.updateById(id, slug? { ...data, slug} : data);
        return updatedCategory;
    },

    // BUSCA CATEGORIAS PELO NOME, IGNORANDO CASE SENSITIVE
    async search(query: string) {
        const categories = await categoryRepository.search(query);
        return categories;
    },

    // BUSCA UMA CATEGORIA PELO ID, VERIFICANDO SE A CATEGORIA EXISTE
    async findById(id: string) {
        const category = await categoryRepository.findById(id);
        if (!category) {
            throw new NotFoundError("Resource not found or does not exist.");
        }
        return category;
    },

    // BUSCA TUDO E TODAS AS CATEGORIAS
    async findAll() {
        const categories = await categoryRepository.findAll();
        return categories;
    },

    // BUSCA UMA CATEGORIA PELO SLUG, VERIFICANDO SE A CATEGORIA EXISTE
    async findBySlug(slug: string) {
        const category = await categoryRepository.findBySlug(slug);
        if (!category) {
            throw new NotFoundError("Resource not found or does not exist.");
        }
        return category;
    },

    // função para puxar da idgb
    async syncFromIgdb() {
        const games = await fetchGames(30);

        for(const game of games) {
            await categoryRepository.upsertBySlug({
                name: game.name,
                slug: game.slug,
                coverUrl: game.cover
                    ? `https:${game.cover.url.replace("t_thumb", "t_cover_big")}`
                    : "https://via.placeholder.com/300x400?text=No+Cover",
                description: game.summary,
            });
        }

    return { synced: games.length };
    
    },
};