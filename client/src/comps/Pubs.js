import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faSearch} from '@fortawesome/free-solid-svg-icons'
import ChipInput from 'material-ui-chip-input'
import Pub from './Pub'
import {useEffect, useState} from "react";
import {getPubsBySearch} from "../actions/pubs";
import {Link, useHistory, useLocation} from "react-router-dom";
import PaginationItems from "./Pagination";
import axios from "axios";

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

export default function Pubs() {
    const query = useQuery()
    const history = useHistory()
    const page = query.get('page') || 1
    const dispatch = useDispatch()
    const searchQuery = query.get('searchQuery')
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])
    const [rates, setRates] = useState([])
    const [sortedPubs, setSortedPubs] = useState([])

    const searchPub = () => {
        if (search.trim() || tags) {
            dispatch(getPubsBySearch({search, tags: tags.join(',')}))
            history.push(`/pubs/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        } else {
            history.push('/')
        }
    }
    const {pubs, isLoading} = useSelector((state) => state.pubs)

    useEffect(() => {
        setSortedPubs(pubs)

    }, [pubs])
    console.log(sortedPubs)

    if (!pubs.length && !isLoading) return 'No pubs'

    const handleAdd = (tag) => setTags([...tags, tag])
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete))

    const handleSortCurrency = ({target: {value}}) => {
        if (value === 'USD') {
            const sorted = [...sortedPubs].sort((a, b) => (b.likeCount > a.likeCount) ? 1 : -1)
            setSortedPubs(sorted)
        } else if (value === 'EUR') {
            const sorted = [...sortedPubs].sort((a, b) => (b.likeCount > a.likeCount) ? 1 : -1)
            setSortedPubs(sorted)
        } else if (value === 'UAH') {
            const sorted = [...sortedPubs].sort((a, b) => (b.likeCount > a.likeCount) ? 1 : -1)
            setSortedPubs(sorted)
        }
    }

    const handleSort = ({target: {value}}) => {
        if (value === 'ASC') {
            const sorted = [...sortedPubs].sort((a, b) => (b.name > a.name) ? 1 : -1)
            setSortedPubs(sorted)
        } else if (value === 'DESC') {
            const sorted = [...sortedPubs].sort((a, b) => (a.name > b.name) ? 1 : -1)
            setSortedPubs(sorted)
        } else if (value === 'LIKE') {
            const sorted = [...sortedPubs].sort((a, b) => (b.likeCount > a.likeCount) ? 1 : -1)
            setSortedPubs(sorted)
        } else if (value === 'NEWEST') {
            const sorted = [...sortedPubs].sort((a, b) => (b.createdAt > a.createdAt) ? 1 : -1)
            setSortedPubs(sorted)
        } else if (value === 'OLDEST') {
            const sorted = [...sortedPubs].sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1)
            setSortedPubs(sorted)
        }
    }

    // useEffect(() => {
    //     axios.get('http://data.fixer.io/api/latest?access_key=07c28e4a20f86617f997d45dc39c48f4')
    //         .then(response => {
    //             setRates(response.data.rates)
    //         })
    // },[])

    const filteredPubs = sortedPubs.filter(pub => {
        return pub.name.toLowerCase().includes(search.toLowerCase())
    })

    return (
        <div>
            <div className='d-flex center-box center-nav mb-40 w-nav'>
                <div className='mr-20 d-flex'>
                    <select className='select-nav w-select1' onChange={handleSortCurrency} defaultValue='SORT'>
                        <option disabled value="SORT">Валюта</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="UAH">UAH</option>
                    </select>

                    <select className='select-nav w-select2' onChange={handleSort} defaultValue='SORT'>
                        <option disabled value="SORT">Сортування</option>
                        <option value="ASC">По зростанню</option>
                        <option value="DESC">По спаданню</option>
                        <option value="LIKE">За популярністю</option>
                        <option value="NEWEST">Новіші</option>
                        <option value="OLDEST">Старіші</option>
                    </select>
                </div>
                <div className='d-flex center-nav'>
                    <div className='search-input'>
                        <input
                            type='text'
                            placeholder='Пошук по закладах...'
                            onChange={({target: {value}}) => setSearch(value)}
                        />
                    </div>
                    <div className='ml-20'>
                        <ChipInput
                            type='text'
                            value={tags}
                            placeholder='Пошук по тегах...'
                            onAdd={(chip) => handleAdd(chip)}
                            onDelete={(chip) => handleDelete(chip)}
                            className='mr-20 ml-20'
                            id='tags-input'
                        />
                    </div>
                    <FontAwesomeIcon icon={faSearch} className='ml-20 icon' onClick={searchPub}/>
                    <div className=' ml-20 '>
                        <div><Link to={'/create'}><FontAwesomeIcon icon={faPlus} className='icon'/></Link></div>
                    </div>
                </div>
            </div>
            <div className='align-center'>
                {filteredPubs?.map((pub) => (
                    <div key={pub._id} className='center-boxes mb-40'>
                        <Pub pub={pub}/>
                    </div>
                ))}
            </div>

            <PaginationItems page={page}/>
        </div>
    )
}
