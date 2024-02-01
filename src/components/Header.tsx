import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <div>
      <Header data-testid="header-component">
        <NavLink to="/search" data-testid="link-to-search"> Search </NavLink>
        <NavLink to="/favorites" data-testid="link-to-favorites">Favorites</NavLink>
        <NavLink to="/profile" data-testid="link-to-profile">Profile</NavLink>
      </Header>
    </div>
  );
}

export default Header;
