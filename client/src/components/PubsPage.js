import Pubs from "./Pubs";
import CreateForm from "./CreateForm";
import {useEffect, useState} from "react";
import {getPubs, getPubsBySearch} from "../actions/pubs";
import {useDispatch, useSelector} from "react-redux";
import PaginationItems from "./Pagination";
import {useHistory, useLocation} from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faSearch} from "@fortawesome/free-solid-svg-icons";
import {getUsersByAdmin} from "../actions/admin";

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

export default function PubsPage() {
    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch()
    const query = useQuery()
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])
    const [sortedPubs, setSortedPubs] = useState([])
    const history = useHistory()


    // const {pubs, isLoading} = useSelector((state) => state.pubs)
    const {pubs} = useSelector((state) => state.pubs)

    //

    useEffect(() => {

    const filteredPubs= pubs.filter((pub) => pub.isActivated === true)

            setSortedPubs(filteredPubs)

    }, [pubs])
    console.log(sortedPubs)

    const searchPub = () => {
        if (search.trim() || tags) {
            dispatch(getPubsBySearch({search, tags: tags.join(',')}))
            history.push(`/pubs/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        } else {
            dispatch(getPubs(1))
            history.push('/')
        }
    }

    const handleAdd = (tag) => setTags([...tags, tag])
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete))

    const handleSortCurrency = ({target: {value}}) => {
        if (value === 'USD') {

            const usdOrder = [...sortedPubs].map((pub) => {
                pub.order = pub.order * 260
                return pub
            })
            setSortedPubs(usdOrder)

        } else if (value === 'EUR') {
            const usdOrder = [...sortedPubs].map((pub) => {
                pub.order = pub.order * 260
                return pub
            })
            setSortedPubs(usdOrder)

        } else if (value === 'UAH') {
            const usdOrder = [...sortedPubs].map((pub) => {
                pub.order = pub.order * 1
                return pub
            })
            setSortedPubs(usdOrder)
        }
    }

    const handleSort = ({target: {value}}) => {
        if (value === 'ASC') {
            const sorted = [...sortedPubs].sort((a, b) => (a.name > b.name) ? 1 : -1)
            setSortedPubs(sorted)
        } else if (value === 'DESC') {
            const sorted = [...sortedPubs].sort((a, b) => (b.name > a.name) ? 1 : -1)
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

    const showVisible = () => {
        const input = document.getElementById('create-form');
        if (input.style.display === "none") {
            input.style.display = "block"
        } else {
            input.style.display = "none"
        }
    }

    return (
        <div className='w-100'>
            <div className='w d-flex center-box center-nav mb-40 w-nav w-85'>
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
                            // onKeyPress={handleKeyPress}
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
                            className='mr-20 ml-20 w-200'
                            id='tags-input'
                        />
                    </div>
                    <FontAwesomeIcon icon={faSearch} className='ml-20 icon' onClick={searchPub}/>
                    <div className=' ml-20 '>
                        <div><FontAwesomeIcon icon={faPlus} className='icon' onClick={showVisible}/></div>
                    </div>
                </div>
            </div>


            <CreateForm currentId={currentId} setCurrentId={setCurrentId}/>
            <Pubs setCurrentId={setCurrentId} sortedPubs={sortedPubs}/>
            {(!searchQuery) && (
                <PaginationItems page={page}/>
            )}
        </div>
    )
}
