import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faSearch} from '@fortawesome/free-solid-svg-icons'
import ChipInput from 'material-ui-chip-input'
import Pub from './Pub'
import {useEffect, useState} from "react";
import {getPubs, getPubsBySearch} from "../actions/pubs";
import {Link, useHistory, useLocation} from "react-router-dom";
import axios from "axios";
import PaginationItems from "./Pagination";

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

export default function Pubs() {
    const query = useQuery()
    const history = useHistory()
    const page = query.get('page') || 1
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])



    // const filteredPubs = pubs.filter(pub => {
    //     return pub.name.toLowerCase().includes(search.toLowerCase())
    // })

    const searchPub = () => {
        if (search.trim() || tags) {
            dispatch(getPubsBySearch({search, tags: tags.join(',')}))
            history.push(`/pubs/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)

        } else {
            history.push('/')
        }
    }
    const pubs = useSelector((state) => state.pubs)

    const xxx = pubs.pubs
    console.log(xxx)
    console.log(pubs)

    const handleAdd = (tag) => setTags([...tags, tag])
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete))


    return (
        <div>
            <div className='d-flex'>
                <div className='mr-20'>
                    <form>
                        <label>xxx
                            <select
                                name='currency'
                                // onChange={onSelectChange}
                            >
                                <option value="USD">USD Dollar</option>
                                <option value="EUR">EUR Euro</option>
                                <option value="UAH">UAH Гривня</option>
                            </select>
                        </label>
                    </form>
                </div>
                <div className='d-flex center-align'>
                    <input
                        type='text'
                        placeholder='Пошук по закладах...'
                        onChange={({target: {value}}) => setSearch(value)}
                    />

                    <ChipInput
                        type='text'
                        value={tags}
                        placeholder='Пошук по тегах...'
                        onAdd={handleAdd}
                        onDelete={handleDelete}
                        className='mr-20'
                        // onChange={({target: {value}}) => setValue(value)}
                    />
                    {/*<button onClick={searchPub}>Search</button>*/}
                    <FontAwesomeIcon icon={faSearch} className='ml-20 icon' onClick={searchPub}/>
                </div>
                <div className='icon-pub ml-20'>
                    <div><Link to={'/create'}><FontAwesomeIcon icon={faPlus} className='icon'/></Link></div>
                </div>
            </div>
            <div className='align-center'>
                {xxx.map((pub) => (
                    <div key={pub._id} className='center-boxes mb-40'>
                        <Pub pub={pub}/>
                    </div>
                ))}
            </div>
            <PaginationItems page={page}/>

        </div>
    )
}
