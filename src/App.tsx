import React, { useState } from 'react';
import Roles from './components/roles'
import Teams from './components/teams'
import People from './components/people'

import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client'
import './App.css';

const menus: string[] = ['Roles', 'Teams', 'People'];

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

interface MainComponent {
  [key: string]: JSX.Element;
}

enum Menu{
  Roles = 'Roles',
  Teams = 'Teams',
  People = 'People'
}

function App() {
  const [menu, setMenu] = useState<string>(Menu.Roles);

  let mainComp : MainComponent = {
    'Roles': (<Roles />),
    'Teams': (<Teams />),
    'People': (<People />),
  }

  function NavMenus() {
    return menus.map((_menu : string, key) => <li key={key} className={menu === _menu ? 'on' : ""} onClick={() => setMenu(_menu)}>{_menu}</li>)
  }

  return (
    <div className="App">
      <ApolloProvider client={client}>
      <header className="App-header">
        <h1>Company Management</h1>
        <nav><ul>{NavMenus()}</ul></nav>
      </header>
      <main>
        {mainComp[menu]}
      </main>
      </ApolloProvider>
    </div>
  );
}

export default App;
