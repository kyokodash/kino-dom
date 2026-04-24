import { z } from 'zod';

export const MovieSchema = z.object({
    id: z.number().optional(),
    title: z.string().optional(),
    overview: z.string().optional(),
    poster_path: z.string().nullable().optional(),
    backdrop_path: z.string().nullable().optional(),
    release_date: z.string().optional(),
    original_language: z.string().optional(),
    popularity: z.number().optional(),
    vote_average: z.number().optional(),
    vote_count: z.number().optional(),
    genre_ids: z.array(z.number()).optional(),
    adult: z.boolean().optional(),
    video: z.boolean().optional(),
});

export const MoviesResponseSchema = z.object({
    results: z.array(MovieSchema).optional().default([]),
});
