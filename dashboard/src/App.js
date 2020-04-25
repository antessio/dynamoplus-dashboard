import React from 'react';
import { Admin, Resource, ListGuesser,EditGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import dataProvider from './dynamoplus/data_provider.js';

//const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
//const dataProvider = 
const App = () => (
      <Admin dataProvider={dataProvider}>
          <Resource name="collection" list={ListGuesser}/>
          {/* <Resource name="index" list={ListGuesser} />
          <Resource name="client_authorization" list={ListGuesser} /> */}
      </Admin>
  );

export default App;