import cron from "node-cron";
import { categoryService } from "../services/category.service";

export function scheduleCategorySyncJob(){
    // CRON JOB PARA SINCRONIZAR CATEGORIAS A CADA 24 HORAS
    cron.schedule("0 0 * * *", async () => {
        console.log("[CRON] Iniciando sincronização de categorias com a IGDB...");

        try {
            const result = await categoryService.syncFromIgdb();
            console.log("[CRON] Sincronização concluída:", result);
        } catch(err){
            console.error("[CRON] Erro de sincronização:", err);
        }
    });
}