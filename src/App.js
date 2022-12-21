import { useEffect, useState } from 'react';
import './App.css';
import AuthComponent from './components/Auth/AuthComponent';
import NavComponent from './components/Navigation/NavComponent';

import config from './config.json';

function App() {
  const [isAuth, setIsAuth] = useState(false)

  const [authState, setAuthState] = useState('landing')

  const handleAuthState = (e) => setAuthState(e.target.name)

  const checkIsAuth = () => {
    const authUser = localStorage.getItem('auth-user')
    if(Boolean(authUser) === true) {
      setIsAuth(true)
    }
  }

  useEffect(() => {
    checkIsAuth()
  }, [isAuth])

  return (
    <div>
      <header className='app-header'>
        <h1>{config.APP_NAME}</h1>
        <p>
          <i>
            {config.APP_SLOGAN}
          </i>
        </p>
      </header>
      {isAuth === false &&
       <AuthComponent
        authState={authState}
        handleAuthState={handleAuthState}
       />
      }
      <NavComponent
      isAuth={isAuth}
      handleAuthState={handleAuthState}
      />
    </div>
  );
}

export default App;
