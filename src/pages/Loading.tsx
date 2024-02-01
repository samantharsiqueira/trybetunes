import Header from '../components/Header';

export default function Loading() {
  return (
    <div data-testid="not-found-page">
      <Header />
      <h1>Carregando...</h1>
    </div>
  );
}
