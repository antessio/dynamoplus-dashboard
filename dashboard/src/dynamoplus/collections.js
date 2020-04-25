// in src/users.js
import React from 'react';
import { List, Datagrid, TextField, EmailField,ReferenceField } from 'react-admin';

export const CollectionList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
        
            <TextField source="id_key" />
            <TextField source="name" />
            <TextField source="order_unique" />
        </Datagrid>
    </List>
);