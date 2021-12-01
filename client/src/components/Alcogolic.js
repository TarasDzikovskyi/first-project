// import {FormControl, FormControlLabel, Radio, RadioGroup, Slider, TextField} from "@material-ui/core";
// import {useEffect, useState} from "react";
// import {useHistory, useLocation} from "react-router-dom";
// import {useDispatch, useSelector} from "react-redux";
// import {getAllSortedPubs, getPubsBySearch} from "../actions/pubs";
// import Pub from "./Pubs/Pub";
// import ChipInput from "material-ui-chip-input";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faPlus, faSearch} from "@fortawesome/free-solid-svg-icons";
// import PaginationItems from "./Pubs/Pagination";
//
//
// function useQuery() {
//     return new URLSearchParams(useLocation().search)
// }
//
// export default function Alcogolic() {
//     const [loading, setLoading] = useState(false)
//     const [sliderMax, setSliderMax] = useState(1000)
//     const [orderRange, setOrderRange] = useState([25, 100])
//     const [filter, setFilter] = useState('')
//     const [sorting, setSorting] = useState('')
//
//
//     const query = useQuery()
//     const page = query.get('page') || 1
//     const [search, setSearch] = useState('')
//     const [tags, setTags] = useState([])
//     const searchQuery = query.get('searchQuery')
//
//     // console.log(page)
//
//
//     const history = useHistory()
//     const dispatch = useDispatch()
//     const location = useLocation()
//
//     const params = location.search ? location.search : null
//
//     const {pubs} = useSelector((state) => state.pubs)
//     // console.log(pubs)
//
//     const [currentQuery, setCurrentQuery] = useState('')
//
//     useEffect(() => {
//
//         const fetchData = async () => {
//
//             setLoading(true)
//             try {
//                 let query
//
//                 if (params && !filter) {
//                     query = params
//                 } else {
//                     query = filter
//                 }
//
//                 if (sorting) {
//                     if (query.length === 0) {
//                         query = `?${sorting}`
//                     } else {
//                     console.log(sorting)
//                         query = query + `&${sorting}`
//                     }
//                 }
//
//                 if (page && !filter && !sorting){
//                     query = `?page=${page}`
//                 }
//
//                 if (search || tags){
//                     query = `?searchQuery=${search}&tags=${tags.join(',')}`
//                 }
//                 console.log(query)
//
//                 await dispatch(getAllSortedPubs(query))
//
//                 setCurrentQuery(query)
//
//                 setLoading(false)
//             } catch (e) {
//                 console.log(e)
//             }
//         }
//         fetchData()
//
//
//     }, [dispatch, filter, params, sorting, page])
//
//
//     console.log(currentQuery)
//     // history.push(currentQuery)
//
//     // console.log(data)
//
//     // if (pubs.data){
//     //    pubs.data.filter((pub) => pub.isActivated === true)
//     // }
//
//
//     const sliderCommitHandler = (e, newValue) => {
//         buildRangeFilter(newValue)
//     }
//
//     const onTextFieldCommitHandler = () => {
//         buildRangeFilter(orderRange);
//     };
//
//     const buildRangeFilter = (newValue) => {
//         const urlFilter = `?order.gte=${newValue[0]}&order.lte=${newValue[1]}`
//
//         setFilter(urlFilter)
//
//         history.push(urlFilter)
//     }
//
//     const handlePriceInputChange = (e, type) => {
//         let newRange;
//
//         if (type === "lower") {
//             newRange = [...orderRange];
//             newRange[0] = Number(e.target.value);
//
//             setOrderRange(newRange);
//         }
//
//         if (type === "upper") {
//             newRange = [...orderRange];
//             newRange[1] = Number(e.target.value);
//
//             setOrderRange(newRange);
//         }
//     };
//
//     const handleNewSortSubmit = ({target: {value}}) => {
//
//         if (value === '-order') {
//             setSorting('sortBy=order&order=asc')
//         } else if (value === 'order') {
//             setSorting('sortBy=order&order=desc')
//         } else if (value  === '-name'){
//             setSorting('sortBy=name&order=asc')
//         } else if (value === 'name'){
//             setSorting('sortBy=name&order=desc')
//         } else if (value === '-createdAt'){
//             setSorting('sortBy=createdAt&order=asc')
//         } else if (value === 'createdAt'){
//             setSorting('sortBy=createdAt&order=desc')
//         } else if(value === '-ratings'){
//             setSorting('sortBy=ratings&order=asc')
//         } else if (value === 'ratings'){
//             setSorting('sortBy=ratings&order=desc')
//         }
//     }
//
//
//     const clearAllFilters = () => {
//         setFilter("");
//         setSorting("");
//         setOrderRange([25, 100]);
//
//         setSearch('')
//         setTags([])
//
//         history.push("/alco");
//     };
//
//
//
//
//
//
//     const searchPub = () => {
//         console.log(search)
//         console.log(tags)
//         if (search.trim() || tags) {
//             console.log(search)
//             console.log(tags)
//             console.log('++++++++++++++++++++++++++++')
//             const query = `?searchQuery=${search}&tags=${tags.join(',')}`
//             dispatch(getAllSortedPubs(query))
//             history.push(`/alco?searchQuery=${search}&tags=${tags.join(',')}`)
//         }
//     }
//
//     // const cancelSearch = () => {
//     //     setSearch('')
//     //     setTags([])
//     //
//     //     history.push('/alco')
//     // }
//
//     const handleAdd = (tag) => setTags([...tags, tag])
//     const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete))
//
//
//     return (
//         <div className='w-90 center-box'>
//             <h1>Alco Page</h1>
//
//             <div className='d-flex'>
//                 <div className='search-input'>
//                     <input
//                         type='text'
//                         value={search}
//                         // onKeyDown={handleKeyPress}
//                         placeholder='Пошук по закладах...'
//                         onChange={({target: {value}}) => setSearch(value)}
//                     />
//                 </div>
//                 <div className='ml-20'>
//                     <ChipInput
//                         type='text'
//                         value={tags}
//                         placeholder='Пошук по тегах...'
//                         onAdd={(chip) => handleAdd(chip)}
//                         onDelete={(chip) => handleDelete(chip)}
//                         className='mr-20 ml-20 w-200'
//                         id='tags-input'
//                     />
//                 </div>
//                 <FontAwesomeIcon icon={faSearch} className='ml-20 icon' onClick={searchPub}/>
//                 {/*<FontAwesomeIcon icon={faSearch} className='ml-20 icon' onClick={cancelSearch}/>*/}
//
//             </div>
//
//
//
//
//             <Slider
//                 min={0}
//                 max={sliderMax}
//                 value={orderRange}
//                 valueLabelDisplay='auto'
//                 onChange={(e, newValue) => setOrderRange(newValue)}
//                 onChangeCommitted={sliderCommitHandler}
//             />
//
//             <div className='d-flex jc-sa'>
//                 <TextField
//                     size='small'
//                     id='lower'
//                     label='Min Order'
//                     type='number'
//                     disabled={loading}
//                     value={orderRange[0]}
//                     onChange={(e) => handlePriceInputChange(e, "lower")}
//                     onBlur={onTextFieldCommitHandler}/>
//                 <TextField
//                     size='small'
//                     id='upper'
//                     label='Max Order'
//                     type='number'
//                     disabled={loading}
//                     value={orderRange[1]}
//                     onChange={(e) => handlePriceInputChange(e, "upper")}
//                     onBlur={onTextFieldCommitHandler}/>
//
//                 <div className='center-vertical'>
//                     <select className='select-nav w-select2' onChange={handleNewSortSubmit} defaultValue='SORT'>
//                         <option disabled value="SORT">Filter</option>
//                         <option value='-order'>Order: Highest-Lowest</option>
//                         <option value='order'>Order: Lowest-Highest</option>
//                         <option value='-name'>Name: Highest-Lowest</option>
//                         <option value='name'>Name: Lowest-Highest</option>
//                         <option value='-createdAt'>CreatedAt: Highest-Lowest</option>
//                         <option value='createdAt'>CreatedAt: Lowest-Highest</option>
//                         <option value='-ratings'>Ratings: Highest-Lowest</option>
//                         <option value='ratings'>Ratings: Lowest-Highest</option>
//                     </select>
//                 </div>
//
//                 <button className='btn-change center-vertical' size="small" onClick={clearAllFilters}>
//                     Clear All
//                 </button>
//
//             </div>
//
//
//             <div className='align-center center-box w-100 mt-30'>
//
//                 {pubs.data?.map((pub) => (
//                     <div key={pub._id} className='center-boxes mb-40'>
//                         <Pub pub={pub} />
//                     </div>
//                 ))}
//             </div>
//
//                 <PaginationItems page={page}/>
//             {( !searchQuery) && (
//                 <div></div>
//             )}
//
//         </div>
//     )
// }
