import React from 'react';

export default function Loading() {
  return (
    <div data-testid="not-found-page">
      <h1>Carregando...</h1>
    </div>
  );
}

// Precisei tirar o <Header/> daqui porque estava dando loop infinito, porque?
