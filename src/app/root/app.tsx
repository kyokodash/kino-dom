import '../styles/index.css';

import { useMovies } from '@entities/movie/model/queries';

const TMDB_IMG_BASE = 'https://image.tmdb.org/t/p/w342';

const App = () => {
    const { data: movies, isLoading, error } = useMovies();

    if (isLoading) {
        return <div className="p-6 text-2xl">Loading movies...</div>;
    }

    if (error) {
        return <div className="p-6 text-2xl">Failed to load movies</div>;
    }

    return (
        <div className="space-y-4 p-6">
            <h1 className="text-3xl font-bold">Movies</h1>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {movies?.map((movie) => (
                    <li key={movie.id ?? `${movie.title}-${movie.release_date}`} className="overflow-hidden rounded-xl border">
                        {movie.poster_path ? (
                            <img
                                src={`${TMDB_IMG_BASE}${movie.poster_path}`}
                                alt={movie.title ?? 'Movie poster'}
                                className="h-72 w-full object-cover"
                                loading="lazy"
                            />
                        ) : (
                            <div className="flex h-72 items-center justify-center bg-gray-100 text-gray-500">
                                No poster
                            </div>
                        )}
                        <div className="space-y-1 p-3">
                            <h2 className="text-lg font-semibold">{movie.title ?? 'Untitled'}</h2>
                            <p className="text-sm text-gray-600">
                                Rating: {movie.vote_average?.toFixed(1) ?? 'N/A'} ({movie.vote_count ?? 0} votes)
                            </p>
                            <p className="text-sm text-gray-600">
                                Release: {movie.release_date || 'Unknown'} • Language: {movie.original_language || 'N/A'}
                            </p>
                            {movie.overview ? (
                                <p className="line-clamp-3 text-sm text-gray-700">{movie.overview}</p>
                            ) : null}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export { App };
