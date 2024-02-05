import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { AlbumType, SongType } from '../types';
import Loading from './Loading';

function Album() {
  const [songs, setSongs] = useState<SongType[]>([]); // Faz uma nova caixa SONGS vazia; Music dava erro pq usaram SONG.
  const [album, setAlbum] = useState<(AlbumType | null)>(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  // Vou esse useEffect porque roda a cada renderizacao
  useEffect(() => {
    // Define uma função assincrona
    async function fetchMusic() {
      // Chama a função que retorna uma promisse
      // Um erro de retorno que so resolveu com essa const desestruturando, porque?
      const [resultAlbum, ...resultSongs] = await getMusics(id || 'string'); // Espera até ter as informaçoes do id da musica e coloca nessa variavel pra gente usar no código
      setAlbum(resultAlbum);
      setSongs([...resultSongs]); // Atualiza a lista de musica
      setLoading(false); // Para de aparecer o carregando
    }
    // Chama a função assincrona
    fetchMusic();
    // O segundo argumento é uma array vazio, indica que o efeito deve ser executado apenas uma vez ao montar o componente
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      {album && (
        <>
          <h2 data-testid="artist-name">{album.artistName}</h2>
          <h3 data-testid="album-name">{album.collectionName}</h3>
        </>
      )}
      {songs.map((song) => (
        <MusicCard
          key={ song.trackId }
          trackName={ song.trackName }
          previewUrl={ song.previewUrl }
        />
      ))}
    </>
  );
}
export default Album;
