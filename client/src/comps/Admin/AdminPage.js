import {Admin, Resource} from 'react-admin';
import lb4Provider from 'react-admin-lb4'
import PubsList from "./PubsList";

export default function AdminPage() {
    return (
        <div id='wrapper' className='btn-none'>
            {/*<h1>Admin Page</h1>*/}
            <Admin id='wrapper' dataProvider={lb4Provider('http://localhost:5000')}>
                <Resource name='pubs' list={PubsList}/>
            </Admin>
        </div>


    )
}
