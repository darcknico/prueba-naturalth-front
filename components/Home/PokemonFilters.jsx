import Link from 'next/link';
import React, { useEffect, useRef } from 'react'

function PokemonFilters({typesPokemon, searchParams, setSearchParamsAndKey}) {
    const searchInput = useRef(null);

    const { results:resultsTypes } = typesPokemon;
    const { type } = searchParams;

    const onClickSearch = () => {
        setSearchParamsAndKey({
            search:searchInput.current.value
        })
    }

    useEffect(() => {
        searchInput.current.value = searchParams.search
    }, [searchParams.search])

    return (
    <>
        <div className='row mb-2'>
            <div className='col'>
                {
                    resultsTypes.map((t)=>{
                        return (
                            <Link
                                href={`?type=${t.id}`}
                                className={`btn badge m-1 ${t.id == type?'bg-primary':'bg-secondary'}`} 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.nativeEvent.preventDefault();
                                    setSearchParamsAndKey({
                                        type:t.id,
                                        search: null,
                                    })
                                }}
                                key={t.id}
                            >
                                    {t.name}
                            </Link>
                        )
                    })
                }
                {
                    type > 0 && (
                        <Link
                            href={`?`}
                            className={`btn badge bg-primary m-1`} 
                            onClick={(e) => {
                                e.stopPropagation();
                                e.nativeEvent.preventDefault();
                                setSearchParamsAndKey({
                                    type:null,
                                    search: null,
                                })
                            }}
                        >
                            CLEAR
                        </Link>
                    )
                }
                
            </div>
        </div>
        <div className='row'>
            <div className='col'>
                <div className="input-group mb-3">
                    <input ref={searchInput} type="text" class="form-control" placeholder="Pokemon name"/>
                    <button className="btn btn-outline-secondary" type="button" onClick={onClickSearch}>Search</button>
                </div>
            </div>
        </div>
    </>
    )
}

export default PokemonFilters