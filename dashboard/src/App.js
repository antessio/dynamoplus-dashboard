// in src/App.js
import * as React from "react";
import jsonServerProvider from 'ra-data-json-server';
import { Admin, Resource, ListGuesser } from 'react-admin';
import authProvider from "./authProvider";
const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const App = () => (
      <Admin dataProvider={dataProvider} authProvider={authProvider} requireAuth>
      </Admin>
  );
export default App;