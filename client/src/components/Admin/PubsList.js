import {List, Datagrid, TextField, EditButton, DeleteButton} from 'react-admin'

export default function PubsList(props){

    return(
            <List {...props} >
                <Datagrid>
                    <TextField source='_id'/>
                    <TextField source='name'/>
                    <TextField source='address'/>
                    <TextField source='contact'/>
                    <EditButton basePath='/pubs'/>
                    <DeleteButton basePath='/pubs'/>
                </Datagrid>
            </List>
    )
}
