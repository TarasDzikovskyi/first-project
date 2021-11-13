import {List, Datagrid, TextField, Filter, SearchInput} from 'react-admin'

export default function PubsList(props){

    const PubsFilter = (props) => (<Filter {...props}>
        <SearchInput placeholder='Name' source='name' resettable alwaysOn/>
    </Filter>)

    return(
        <div>
            <List {...props} filters={<PubsFilter/>}>
                <Datagrid>
                    <TextField source='_id'/>
                    <TextField source='name'/>
                    <TextField source='address'/>
                    <TextField source='contact'/>
                </Datagrid>
            </List>
        </div>
    )
}
