import { useMoviePopularList } from '@shared/api/generated/tmdb';
import { MoviesResponseSchema } from './schema';

export const useMovies = () => {
    return useMoviePopularList(undefined, {
        query: {
            select: (data) => MoviesResponseSchema.parse(data).results,
        },
    });
};
