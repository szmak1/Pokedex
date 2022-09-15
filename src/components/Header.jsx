import React from 'react';
import pokeball from '../assets/pokeball.png';

const Header = () => {
  return (
    <div>
      <nav
        className="p-4 pt-12"
        style={{
          color: 'white',
        }}>
        <a
        className='flex items-center justify-center gap-4'
          href="/"
        >
          <span className='text-centers text-3xl font-bold'>Pokédex</span>
          <img src={pokeball} style={{ width: 60 }} alt="pokeball" />
        </a>
      </nav>
    </div>
  );
}

export default Header;