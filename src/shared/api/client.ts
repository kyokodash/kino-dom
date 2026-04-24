type QueryParams = Record<string, unknown>;

type TmdbRequestConfig = {
    url: string;
    method: string;
    params?: QueryParams;
    data?: unknown;
    signal?: AbortSignal;
    headers?: HeadersInit;
};

const appendQueryParams = (url: URL, params?: QueryParams) => {
    if (!params) {
        return;
    }

    for (const [key, value] of Object.entries(params)) {
        if (value === undefined || value === null) {
            continue;
        }

        if (Array.isArray(value)) {
            for (const item of value) {
                url.searchParams.append(key, String(item));
            }
            continue;
        }

        url.searchParams.set(key, String(value));
    }
};

export const tmdbFetch = async <TResponse>(
    config: TmdbRequestConfig,
    options?: RequestInit
): Promise<TResponse> => {
    const ACCESS_TOKEN = import.meta.env.VITE_MOVIEDB_ACCESS_TOKEN;
    const baseUrl = import.meta.env.VITE_MOVIEDB_BASE_URL ?? 'https://api.themoviedb.org';
    const requestUrl = new URL(config.url, baseUrl);
    appendQueryParams(requestUrl, config.params);

    const rawBody = config.data as { RAW_BODY?: string } | undefined;
    const body =
        config.data === undefined
            ? undefined
            : rawBody?.RAW_BODY ??
              (typeof config.data === 'string'
                  ? config.data
                  : JSON.stringify(config.data));

    const response = await fetch(requestUrl, {
        ...options,
        method: config.method,
        body,
        signal: config.signal ?? options?.signal,
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            ...(body ? { 'Content-Type': 'application/json' } : {}),
            ...config.headers,
            ...options?.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    return response.json() as Promise<TResponse>;
};
