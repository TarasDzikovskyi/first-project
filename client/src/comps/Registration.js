// import {useState} from "react";
// import {Link} from "react-router-dom";
//
// const CreateRegisterFrom = ({onSubmit}) => {
//     const [name, setName] = useState('')
//     const [born_year, setBornYear] = useState('')
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [loading, setLoading] = useState(false)
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//
//         if (!email || !password || !name || !born_year || loading) return
//
//         try {
//             setLoading(true)
//             await onSubmit(name, email, born_year, password)
//             // setEmail('')
//             // setPassword('')
//             // setName('')
//             // setBornYear('')
//         } catch (e) {
//             console.log(e)
//         } finally {
//             setLoading(false)
//         }
//     }
//
//     return (
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label htmlFor='name'>Name</label>
//                 <input
//                     placeholder='Name'
//                     type="text"
//                     value={name}
//                     onChange={({target: {value}}) => setName(value)}
//                 />
//             </div>
//             <div>
//                 <label htmlFor='email'>Email</label>
//                 <input
//                     placeholder='Email'
//                     type="text"
//                     value={email}
//                     onChange={({target: {value}}) => setEmail(value)}
//                 />
//             </div>
//             <div>
//                 <label htmlFor='born_year'>Born Year</label>
//                 <input
//                     placeholder='Born year'
//                     type="number"
//                     value={born_year}
//                     onChange={({target: {value}}) => setBornYear(value)}
//                 />
//             </div>
//             <div>
//                 <label htmlFor="email">Password</label>
//                 <input
//                     placeholder='Password'
//                     type="text"
//                     value={password}
//                     onChange={({target: {value}}) => setPassword(value)}
//
//                 />
//             </div>
//             <button
//                 // className='btn yellow darken-4'
//                 className='btn grey lighten-1 black-text mt-10'
//                 type='submit'
//                 // disabled={!email || !password || !name || !born_year || loading}
//             >Registration
//             </button>
//         </form>
//     )
// }
//
// export default function Registration() {
//     const registerHandler = async (name, email, born_year, password) => {
//         if (!email || !password || !name || !born_year) return;
//
//         const response = await fetch('/auth/register', {
//             method: 'POST',
//             body: JSON.stringify({name, email, born_year, password}),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//         console.log(response)
//         const data = await response.json();
//         console.log(data)
//     }
//
//     return (
//         <div>
//             <h1>Registration</h1>
//             <div className="row">
//                 <div className="col s12 m6">
//                     <div className="card blue-grey darken-1">
//                         <div className="card-content white-text">
//                             <span className="card-title">Реєстрація нового пиячка</span>
//
//                             <CreateRegisterFrom onSubmit={registerHandler}/>
//
//                             <div>
//                                 <span>ALREADY HAVE AN ACCOUNT?</span>
//                                 <button
//                                     className='btn grey lighten-1 black-text mt-10'
//                                     type='submit'
//                                     style={{textDecoration: 'none'}}
//                                 ><Link to={'/login'}>Sign In</Link>
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
