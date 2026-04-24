import { defineConfig } from 'orval';

export default defineConfig({
    tmdb: {
        input: 'https://developer.themoviedb.org/openapi/tmdb-api.json',
        output: {
            target: './src/shared/api/generated/tmdb.ts',
            schemas: './src/shared/api/generated/model',
            client: 'react-query',
            mode: 'single',
            mock: false,
            override: {
                mutator: {
                    path: './src/shared/api/client.ts',
                    name: 'tmdbFetch',
                },
            },
        },
    },
});
