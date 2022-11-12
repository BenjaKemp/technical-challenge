import React from 'react';
import './styles/style.scss';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import logo from './assets/images/icons/logo-white.svg'

function App() {
  return (
    <>
      <Header>
          <img src={logo} className="App-logo" alt="logo" />
      </Header>
      <Dashboard/>
    </>
  );
}

export default App;
