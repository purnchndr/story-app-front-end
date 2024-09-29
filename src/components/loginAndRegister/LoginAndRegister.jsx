import { useState } from 'react';
import SplashScreen from '../splashScreen/SplashScreen';
import style from './LoginAndRegister.module.css';

function LoginAndRegister({ closeModal, auth = false }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');
  let mode = auth === 'login' ? 'Login' : 'Register';
  const handelUsername = e => setUsername(e.target.value);
  const handelPassword = e => setPassword(e.target.value);

  async function authenticate(params) {
    if (!password) return setError('Password is required');
    if (!username) return setError('Username is required');
    else setError('Invalid Password');

    localStorage.setItem('token', 'true');
    console.log('Logged in');
    closeModal();
  }

  return (
    <>
      {loader ? (
        <SplashScreen />
      ) : (
        <div className={style.auth}>
          <h1>{mode}</h1>
          <div className={style.inputs}>
            <label>
              Username
              <input
                type='text'
                value={username}
                onChange={handelUsername}
                placeholder='Enter Username'
              />
            </label>
            <label>
              Password
              <input
                type='password'
                value={password}
                onChange={handelPassword}
                placeholder='Enter password'
              />
            </label>
          </div>
          <p className={style.error}>{error}</p>
          <button onClick={authenticate}>{mode}</button>
        </div>
      )}
    </>
  );
}

export default LoginAndRegister;
