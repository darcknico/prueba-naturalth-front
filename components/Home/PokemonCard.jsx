import { fetcher } from '@/helpers/utilsFunctions';
import React, { useState } from 'react'
import ReactModal from 'react-modal';

function PokemonCard({item:itemOrigin}) {
    const [item, setItem] = useState(itemOrigin)
    const { sprites, name, stats, types, abilities, moves } = item;
    
    const [isOpenModal, setIsOpenModal] = useState(false)
    const closeModal = () => {
        setIsOpenModal(false);
    }

    const onClickDetail = async () => {
        setIsOpenModal(true)
        const details = await fetcher(`http://localhost:4200/api/pokemon/${name}`);
        setItem({
            ...item,
            ...details
        })
    }

    return(
        <>
        <div className='col-md-3 col-6'>
            <div className="card" key={item.id} onClick={()=> onClickDetail(true)}>
                <img className="card-img-top" src={sprites.front_default} alt="Card image cap"></img>
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">types: 
                        {
                            types.map((t)=>{
                                const type = t.type.name;
                                return <span className='badge bg-secondary m-1' key={type}> {type} </span>
                            })
                        }
                    </p>
                    <div className='row'>
                        {
                            stats.map((s)=>{
                                const base_stat = s.base_stat;
                                const stat = s.stat.name;
                                return <div className='col-4' key={stat}>
                                    <small>{stat.replace('special','s')}: {base_stat}</small>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
        <ReactModal
            isOpen={isOpenModal}
            onRequestClose={closeModal}
            className="modal show"
            style={{
                content:{
                    display: 'block'
                }
            }}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Modal title</h5>
                    <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <img className="card-img-top" src={sprites.front_default} alt="Card image cap"></img>
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">types: 
                            {
                                types.map((t)=>{
                                    const type = t.type.name;
                                    return <span className='badge bg-secondary m-1' key={type}> {type} </span>
                                })
                            }
                        </p>
                        <div className='row'>
                            {
                                stats.map((s)=>{
                                    const base_stat = s.base_stat;
                                    const stat = s.stat.name;
                                    return <div className='col-4' key={`stat_${stat}`}>
                                        <small>{stat.replace('special','s')}: {base_stat}</small>
                                    </div>
                                })
                            }
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <small><b>Abilities:</b></small>
                            </div>
                        </div>
                        <div className='row'>
                            {
                                abilities?.map((s)=>{
                                    const name = s.ability.name;
                                    return <div className='col-3' key={`abi_${name}`}>
                                        <small>{name}</small>
                                    </div>
                                })
                            }
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <small><b>Moves:</b></small>
                            </div>
                        </div>
                        <div className='row'>
                            {
                                moves?.slice(0,10).map((s)=>{
                                    const name = s.move.name;
                                    return <div className='col-3' key={`abi_${name}`}>
                                        <small>{name}</small>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                </div>
                </div>
            </div>
        </ReactModal>
        </>
    )

}

export default PokemonCard