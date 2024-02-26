import axios from "axios";

export function buildKey(searchParams) {
    const offset = searchParams.page > 1? searchParams.page*20 : 0;
    if(String(searchParams.search).trim().length > 1 && searchParams.type == null){
        return `http://localhost:4200/api/pokemon/${searchParams.search}`
    }
    if(searchParams.type > 0){
        return `http://localhost:4200/api/pokemon/types/${searchParams.type}?offset=${offset}`
    }
    return `http://localhost:4200/api/pokemon?offset=${offset}`
}

export const fetcher = url => axios.get(url).then(res => res.data)

export const arrayRange = (start, stop, step = 1) =>
    Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
);