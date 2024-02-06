import React, { useState } from 'react';

interface MusicCardProps {
  trackName: string,
  previewUrl: string,
  trackId: number
}

function MusicCard({ trackName, previewUrl, trackId }:MusicCardProps) {
  const [isChecked, setChecked] = useState(false); // Pra poder alterar a imagem

  const handleChecked = () => {
    setChecked(!isChecked);
  };

  return (
    <>
      <h3>
        { trackName }
      </h3>
      <audio data-testid="audio-component" controls>
        <track kind="captions" />
        <source src={ previewUrl } type="audio/mpeg" />
        Seu navegador não suporta o elemento de áudio.
      </audio>
      <label htmlFor={ `${trackName}` } data-testid={ `checkbox-music-${trackId}` }>
        <input
          type="checkbox"
          id={ trackName }
          checked={ isChecked }
          onChange={ handleChecked }
        />
        <img
          src={ isChecked ? '/src/images/checked_heart.png'
            : '/src/images/empty_heart.png' }
          alt="favorite"
        />
      </label>
    </>
  );
}

export default MusicCard;
