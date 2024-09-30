import { useState } from 'react';
import SplashScreen from '../splashScreen/SplashScreen';
import style from './LoginAndRegister.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginAndRegister({ closeModal, auth = false }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  let mode = auth === 'login' ? 'Login' : 'Register';
  const handelUsername = e => setUsername(e.target.value);
  const handelPassword = e => setPassword(e.target.value);

  async function authenticate(params) {
    try {
      if (!password) return setError('Password is required');
      if (!username) return setError('Username is required');
      if (username.includes(' '))
        return setError('username should not contain space');
      setLoader(true);
      let config;
      if (mode === 'Login') {
        config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: window.backendUrl + 'api/user/login/',
          headers: {},
          data: { username, password },
        };
      } else {
        config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: window.backendUrl + 'api/user/register/',
          headers: {},
          data: { username, password },
        };
      }
      const res = await axios.request(config);
      console.log(res);
      const data = res.data;
      localStorage.setItem('token', data.token);
      // localStorage.setItem('username', data.username);
      localStorage.setItem('user', JSON.stringify(data.user));
      console.log('Logged in');
      closeModal();
      navigate('/your-stories');
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || err.message;
      setError(msg);
    } finally {
      setLoader(false);
    }
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
