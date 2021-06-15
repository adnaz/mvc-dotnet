import React, { Component, useState } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';

import './custom.css'
import Login from './components/Login';
import SignUp from './components/SignUp';
import Store from './components/Store';
import Apps from './components/Apps';

import HeadToHead from './screen/HeadToHead';
import Players from './screen/Players';
import Tournament from './screen/Tournament';



export const MyContext = React.createContext({});
const App = () => {
  const displayName = App.name;
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [credit, setCredit] = useState(0)
  // const {token,setToken} = useContext(MyContext);


  return (
    <MyContext.Provider value={{ token, setToken,credit, setCredit }}>
      {
        token ?
          (

            <Layout>

              <Route exact path='/' component={Home} />
              <Route path='/mystore' component={Store} />
              <Route path='/myapps' component={Apps} />

              <Route path='/h2h' component={HeadToHead} />
        <Route path='/Players' component={Players} />
        <Route path='/Tournament' component={Tournament} />
            </Layout>
          )
          :
          (
            <>
              <Route exact path={["/","/login"]} component={Login} />
              <Route exact path='/signup' component={SignUp} />
            </>
          )
      }


    </MyContext.Provider>
  );
}
export default App;
