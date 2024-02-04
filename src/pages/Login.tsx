import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

function Login() {
  const [input, setInput] = useState(''); // Pra validar os digitos do input e liberar o botao
  const [loading, setLoading] = useState(false); // Para usar o carregando na pagina
  const navigate = useNavigate(); // Para redirecionar para a /search depois

  // TODO: O botao tem que estar disabilitado ate que haja 3 digitos
  // event: ChangeEvent<HTMLInputElement> para corrigir o erro 'event' implicitly has 'any' type;
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleLogin = async () => {
    setLoading(true);

    try {
      await createUser({ name: input }) // Salva o nome da pessoa usuaria
        .then(() => navigate('search')); // Deu certo, redireciona pra /search com o hook navigate
    } catch (error) {
      console.error('Erro ao salvar o nome:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={ handleLogin }>
      <label>
        Nome
        <input
          type="text"
          placeholder="Nome"
          name="name"
          data-testid="login-name-input"
          value={ input }
          onChange={ handleChange }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-button"
        disabled={ input.length < 3 || loading }
        onClick={ handleLogin }
      >
        Entrar
      </button>

      {loading && <Loading />}
    </form>
    // Renderizacao condifional if true renderiza
  );
}

export default Login;
