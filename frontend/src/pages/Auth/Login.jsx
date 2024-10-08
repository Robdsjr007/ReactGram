import { Link } from 'react-router-dom';
import Message from '../../components/Message';

// estilos
import './auth.sass'

// Hooks
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Redux
import {login, reset} from '../../slices/authSlice';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const {loading, error} = useSelector((state) => state.auth);
  
  const handleSubmit = (e) => {
    e.preventDefault();


    const user = {
      email,
      password,
    };

    dispatch(login(user));
  };

  // clear all auth states
  useEffect(() => {
    dispatch(reset())
  }, [dispatch])

  return (
    <div id='login'>
      <h2>ReactGram</h2>
      <p className="subtitle">Faça login para ver o que há de novo.</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email || ""}/>
        <input type="password" placeholder='Senha' onChange={(e) => setPassword(e.target.value)} value={password || ""}/>
        {!loading && <button type="submit">Entrar</button>}
        {loading && <button type="submit" disabled>Aguarde...</button>}
        {error && <Message msg={error} type="error"/>}
        <p>Não tem um conta? <Link to="/register">Clique aqui.</Link></p>
      </form>
    </div>
  )
}

export default Login