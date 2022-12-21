import { useEffect, useState } from 'react';
import './App.css';
import AuthComponent from './components/Auth/AuthComponent';
import CollectionComponent from './components/Collections/CollectionComponent';
import GeolocationComponent from './components/GeoLocation/GeoLocationComponent';
import HelpComponent from './components/Help/HelpComponent';
import MainComponent from './components/Main/MainComponent';
import NavComponent from './components/Navigation/NavComponent';
import ProfileComponent from './components/Profile/ProfileComponent';


import config from './config.json';

function App() {
  const [isAuth, setIsAuth] = useState(false)

  const [authState, setAuthState] = useState('landing')
  const [mainState, setMainState] = useState('request')

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
      <GeolocationComponent/>
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

      {(isAuth === true && mainState === 'request') &&
        <MainComponent/>
      }

      {(isAuth === true && mainState === 'collections') &&
        <CollectionComponent/>
      }

      {(isAuth === true && mainState === 'profile') &&
        <ProfileComponent/>
      }

      {mainState === 'help' && <HelpComponent/>}

  
      <NavComponent
        isAuth={isAuth}
        handleAuthState={handleAuthState}
        setMainState={setMainState}
      />
    </div>
  );
}

export default App;
