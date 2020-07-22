import React from 'react';

import { Container } from './styles';

import DropdownOption from '../Dropdown/DropdownOption';

import Products from '../Content/Products';
import Developers from '../Content/Developers';
import Company from '../Content/Company';

const NavBar: React.FC = () => {
  return (
    <Container>
      <ul>
        <li>
          <DropdownOption
            name="Produtos"
            content={Products}
            backgroundHeight={280}
          />
        </li>
        <li>
          <DropdownOption
            name="Desenvolvedores"
            content={Developers}
            backgroundHeight={160}
          />
        </li>
        <li>
          <DropdownOption
            name="Empresa"
            content={Company}
            backgroundHeight={200}
          />
        </li>
      </ul>
    </Container>
  );
};

export default NavBar;
