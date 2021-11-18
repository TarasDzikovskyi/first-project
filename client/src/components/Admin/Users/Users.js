import {useSelector} from "react-redux";
import User from "./User";

export default function Users({setCurrentId}){

    const {users} = useSelector((state) => state.users)
    console.log(users)

    if (!users.length) return 'No users'

    const showVisible = () => {
        const input = document.getElementById('create-form');
        if (input.style.display === 'none') {
            input.style.display = 'block'
        } else {
            input.style.display = 'none'
        }
    }

    return(
        <div className='w-65'>
            <button className='btn-link' onClick={showVisible}>Create User</button>
            <div className='table-wrapper h-670'>
                <div className='d-flex j-content-around w-100 header-table'>
                    <div className='w-20'>NAME</div>
                    <div className='w-20'>BORN YEAR</div>
                    <div className='w-20'>EMAIL</div>
                    {/*<div className='w-20'>PASSWORD </div>*/}
                    <div className='w-30'>CREATED AT</div>
                </div>
                {users.map((user) => (
                    <div key={user._id}>
                        <User user={user} setCurrentId={setCurrentId}/>
                    </div>
                ))}
            </div>
        </div>
    )
}
