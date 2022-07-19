import React from 'react';
import Logo from '../../img/logo.svg';
import { UilSearch } from '@iconscout/react-unicons';

const LogoSearch = () => {
  return (
    <div className="LogoSearch">
      <img src={Logo} alt="" />
      <div className="Search">
        <input type="text" placeholder="Rechercher" />
        <div className="s-icon">
          <UilSearch />
        </div>
      </div>
    </div>
  );
};

export default LogoSearch;
