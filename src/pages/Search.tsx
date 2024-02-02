import React, { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import { AlbumType } from '../types';

function Search() {
  const [loading, setLoading] = useState(false); // Para usar o carregando na pagina
  const [search, setSearch] = useState(''); // Pra atulizar a barra de pesquisa quando digitar
  const [albums, setAlbums] = useState<AlbumType[]>([]); // Array vazio pra retornar a pesquisa nele
  const [lastSearch, setlastSearch] = useState(''); // Para limpar o input

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await searchAlbumsAPI(search);
      setAlbums(response);
      setlastSearch(search);// Limpa o valor do input após a pesquisa
      setSearch('');
      console.log('Response:', response);
    } catch (error) {
      console.error('Erro ao buscar álbuns:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={ handleSearch }>
      <label>
        <input
          type="text"
          data-testid="search-artist-input"
          value={ search }
          onChange={ handleChange }
        />
      </label>

      <button
        type="submit"
        data-testid="search-artist-button"
        disabled={ search.length < 2 }
        // Quando clicar vai Pesquisar
      >
        Pesquisar
      </button>
      {loading && <Loading />}
      {/* Exibe o texto "Resultado de álbuns de: " seguido pelo último termo de pesquisa */}
      <p>{`Resultado de álbuns de: ${lastSearch}`}</p>
      {/* Verifica se há álbuns na lista antes de renderizar a lista */}
      {albums.length > 0 ? (
        // Se há álbuns, renderiza uma lista não ordenada (ul)
        <ul>
          {/* Mapeia cada álbum na lista e cria um item de lista (li) para cada um */}
          {albums.map((album) => (
            <li key={ album.collectionId }>
              {/* Cria um link (Link) para a rota do álbum com base no ID da coleção */}
              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId} ` }
              >
                {/* Exibe o nome da coleção do álbum */}
                { album.collectionName }
              </Link>
            </li>
          ))}
        </ul>
      )
        : (
          // Se não há álbuns, exibe uma mensagem informando que nenhum álbum foi encontrado
          <p>Nenhum álbum foi encontrado</p>
        )}
    </form>

  );
}

export default Search;
