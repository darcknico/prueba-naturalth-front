import { arrayRange } from '@/helpers/utilsFunctions';
import Link from 'next/link';
import React from 'react'

const makeUrlPagination = (page,type) => {
    return `?page=${page}${type>0?'&type='+type:''}`
}

function PokemonPagination({count, searchParams, setSearchParamsAndKey}) {
    const totalPages = Math.trunc(count / 20);
    const isPrevius = searchParams.page > 1;
    const isNext = searchParams.page < totalPages;
    const arrayOfPages = arrayRange(1, totalPages);

    return (
        <nav aria-label="Page navigation example">
            TOTAL: {count}<br/>
            PAGE: {searchParams.page}<br/>
            TP: {totalPages}
            <ul className="pagination">
                <li className={`page-item ${!isPrevius && 'disabled'}`}>
                    <Link
                        href={makeUrlPagination(searchParams.page-1,searchParams.type)}
                        className={`page-link `} 
                        onClick={(e) => {
                            e.stopPropagation();
                            e.nativeEvent.preventDefault();
                            setSearchParamsAndKey({page:searchParams.page-1, type:searchParams.type || null})
                        }}
                        aria-label='Previous'
                    >
                        <span aria-hidden="true">&laquo;</span>
                    </Link>
                </li>
                {
                    arrayOfPages.map((page)=>{
                        const href = makeUrlPagination(page,searchParams.type)
                        return (
                            <li className={`page-item ${page==searchParams.page && 'active'}`} key={`page_${page}`}>
                                <Link
                                    href={href}
                                    className={`page-link `} 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.nativeEvent.preventDefault();
                                        setSearchParamsAndKey({page, type:searchParams.type || null})
                                    }}
                                >
                                    {page}
                                </Link>
                            </li>
                        )
                    })
                }
                <li className={`page-item ${!isNext && 'disabled'}`}>
                    <Link
                        href={makeUrlPagination(searchParams.page+1,searchParams.type)}
                        className={`page-link `} 
                        onClick={(e) => {
                            e.stopPropagation();
                            e.nativeEvent.preventDefault();
                            setSearchParamsAndKey({page:searchParams.page+1, type:searchParams.type || null})
                        }}
                        aria-label='Next'
                    >
                        <span aria-hidden="true">&raquo;</span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default PokemonPagination