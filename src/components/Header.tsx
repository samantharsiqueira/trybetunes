import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

function Header() {
  const [userName, setUserName] = useState(''); // Armazena o nome do usuário
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define uma função assincrona
    async function fetchUser() {
      // Chama a função que retorna uma promisse
      const user = await getUser(); // Espera até ter as informaçoes do user e coloca nessa variavel pra gente usar no código
      setUserName(user.name); // Atualiza o estado com o nome do usuário
      setLoading(false); // Para de aparecer o carregando
    }
    // Chama a função assincrona
    fetchUser();
    // O segundo argumento é uma array vazio, indica que o efeito deve ser executado apenas uma vez ao montar o componente
  }, []); // Só vai pegar o usuário quando montar pela primeira vez.

  // Retorna a estrutura do componente
  return (
    <header
      data-testid="header-component"
      className="header"
    >
      <NavLink to="/search" data-testid="link-to-search"> Search </NavLink>
      <NavLink to="/favorites" data-testid="link-to-favorites">Favorites</NavLink>
      <NavLink to="/profile" data-testid="link-to-profile">Profile</NavLink>
      {loading ? (
        <Loading />
      ) : (
        <p data-testid="header-user-name">{userName}</p>
      )}
    </header>
  );
}

export default Header;
