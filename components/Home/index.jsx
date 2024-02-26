import React, { useState } from 'react'
import PokemonCard from './PokemonCard'
import Link from 'next/link';
import PokemonFilters from './PokemonFilters';
import useSWR from 'swr';
import { buildKey, fetcher } from '@/helpers/utilsFunctions';
import PokemonPagination from './PokemonPagination';

function Home({initialKey, listPokemon, typesPokemon, searchParams:searchParamsOrigin}) {
    const [key, setKey] = useState(initialKey)
    const [searchParams, setSearchParams] = useState(searchParamsOrigin)
    const isFromSearchBox = String(searchParams.search).trim().length > 1

    function setSearchParamsAndKey(newSearchParams) {
        setSearchParams({
            ...newSearchParams,
            search: newSearchParams.search??'',
            page: newSearchParams.page??1,
            type: newSearchParams.type??null,
        })
        setKey(buildKey(newSearchParams))
    }

    const {data, error} = useSWR(key, fetcher, {
        initialData: key === initialKey ? {listPokemon} : null
    })

    console.log(isFromSearchBox)
    
    return (
        <div className='container'>
            <PokemonFilters typesPokemon={typesPokemon} searchParams={searchParams} setSearchParamsAndKey={setSearchParamsAndKey}/>
            <div className='row'>
                {
                    (isFromSearchBox && data) ? (
                        <PokemonCard item={data}/>
                    ) : (
                        data ? 
                        data.results.map((result)=>{
                            return <PokemonCard item={result} key={result.id}/>
                        })
                        :
                        <h1>loading</h1>
                    )
                }
                {
                    error && <h1>{error?.response?.data || 'Error'}</h1>
                }
            </div>
            <PokemonPagination count={data?.count || 0} searchParams={searchParams} setSearchParamsAndKey={setSearchParamsAndKey}/>
        </div>
    )
}

export default Home