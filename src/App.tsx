import { Route, Routes } from 'react-router-dom';
import { Login, Search, Album, Favorites, Profile, ProfileEdit, NotFound } from './pages';
import Layout from './components/Layout';

function App() {
  return (
    <>
      <p>Trybetunes</p>
      <Routes>
        <Route path="/" element={ <Layout /> }>
          <Route path="/search" element={ <Search /> } />
          <Route path="/album/:id" element={ <Album /> } />
          <Route path="/favorites" element={ <Favorites /> } />
          <Route path="/profile" element={ <Profile /> } />
          <Route path="/profile/edit" element={ <ProfileEdit /> } />
          <Route path="*" element={ <NotFound /> } />
        </Route>
        <Route index element={ <Login /> } />
      </Routes>
    </>
  );
}

export default App;
