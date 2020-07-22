import React from 'react';

import { DropdownProvider } from './hooks/dropdown';

import GlobalStyles from './styles/global';

import Layout from './components/Layout';
import NavBar from './components/Navbar';
import DropdownRoot from './components/Dropdown';

const App: React.FC = () => {
  return (
    <>
      <Layout>
        <DropdownProvider>
          <NavBar />
          <DropdownRoot />
        </DropdownProvider>
      </Layout>

      <GlobalStyles />
    </>
  );
};

export default App;
