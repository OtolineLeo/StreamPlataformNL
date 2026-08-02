let cachedToken: { value: string; expiresAt: number } | null = null;

async function getIdgbToken(): Promise<string> {
    if(cachedToken && cachedToken.expiresAt > Date.now()) {
        return cachedToken.value;
    }

    const params = new URLSearchParams({
        client_id: process.env.IGDB_CLIENT_ID as string,
        client_secret: process.env.IGDB_CLIENT_SECRET as string,
        grant_type: "client_credentials",
    });

    const response = await fetch(`https://id.twitch.tv/oauth2/token?${params}`, {
        method: "POST",
    });

    const data = await response.json();

    cachedToken = {
        value: data.access_token,
        expiresAt: Date.now() + data.expires_in * 1000,
    };

    return cachedToken.value;

}

// FUNÇAO PARA REMOVER JOGOS DUPLICADOS, MAS NÃO ESTÁ SENDO USADA NO MOMENTO.

// function removeDuplicateGame(games: IgdbGame[]): IgdbGame[] {
//     const seenNames = new Set<string>();
//     const uniqueGames: IgdbGame[] = [];

//     for (const game of games){
//         const normalizedName = game.name.toLowerCase().trim();
//         if(!seenNames.has(normalizedName)) {
//             seenNames.add(normalizedName);
//             uniqueGames.push(game);
//         }
//     }

//     return uniqueGames;
// }

interface IgdbGame {
    id: number;
    name: string;
    slug: string;
    summary: string;
    cover?: {
        url: string;
    };
}

async function fetchGames(limit = 30): Promise<IgdbGame[]> {
    const token = await getIdgbToken();

    const response = await fetch("https://api.igdb.com/v4/games", {
        method: "POST",
        headers: {
            "Client-ID": process.env.IGDB_CLIENT_ID as string,
            "Authorization": `Bearer ${token}`,
        },
        body: `
        fields name, slug, summary, cover.url;
        sort total_rating_count desc;
        where cover != null & total_rating_count > 10 & (category = 0 | category = null);
        limit ${limit};
        `,
    });

    const games = await response.json();
    return games;
    // return removeDuplicateGame(games);
}

export { getIdgbToken, fetchGames, };