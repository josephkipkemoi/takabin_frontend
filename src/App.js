import { useEffect, useState } from 'react';
import './App.css';

import AuthComponent from './components/Auth/AuthComponent';
import CollectionComponent from './components/Collections/CollectionComponent';
import GeolocationComponent from './components/GeoLocation/GeoLocationComponent';
import Header from './components/Header/Header';
import HelpComponent from './components/Help/HelpComponent';
import NavComponent from './components/Navigation/NavComponent';
import ProfileComponent from './components/Profile/ProfileComponent';
import Collectee from './pages/Collectee/Collectee';
import Collector from './pages/Collector/Collector';

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [userRole, setUserRole] = useState(null)

  const [authState, setAuthState] = useState('landing')
  const [mainState, setMainState] = useState('request')

  const handleAuthState = (e) => setAuthState(e.target.name)

  const checkIsAuth = () => {
    const authUser = localStorage.getItem('auth-user')
    const userRole = localStorage.getItem('user-role')
    if(Boolean(authUser) === true) {
      setIsAuth(true)
      setUserRole(userRole)
    }
  }

  useEffect(() => {
    checkIsAuth()
  }, [isAuth])

  return (
    <div>
      <GeolocationComponent/>
      <div className='container'> 
      <Header/>

      {isAuth === false &&
       <AuthComponent
        authState={authState}
        handleAuthState={handleAuthState}
       />
      }

        {(isAuth === true && userRole === 'collectee') &&
          <Collectee
          isAuth={isAuth}
          mainState={mainState}
          />
        }

    

    {(isAuth === true && userRole === 'collector') &&
        <Collector
        isAuth={isAuth}
        mainState={mainState}
        />
      }

      {(isAuth === true && mainState === 'collections') &&
        <CollectionComponent/>
      }

      {(isAuth === true && mainState === 'profile') &&
        <ProfileComponent/>
      }

      {mainState === 'help' && <HelpComponent/>}

  
      </div>
     
      <NavComponent
        isAuth={isAuth}
        handleAuthState={handleAuthState}
        setMainState={setMainState}
      /> 
    </div>
  );
}

export default App;
