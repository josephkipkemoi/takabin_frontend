import { useEffect, useState } from 'react';
import './App.css';

import AuthComponent from './components/Auth/AuthComponent';
import GeolocationComponent from './components/GeoLocation/GeoLocationComponent';
import Header from './components/Header/Header';
import NavComponent from './components/Navigation/NavComponent';
import TopNavigation from './components/TopNavigation/TopNavigation';
import Collectee from './pages/Collectee/Collectee';

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
      {isAuth && <TopNavigation/>}
      <GeolocationComponent/>
      <div className='container'> 
      <Header/>

      {isAuth === false &&
       <AuthComponent
        authState={authState}
        handleAuthState={handleAuthState}
       />
      }

        {(isAuth === true && userRole === 'Collectee') &&
          <Collectee
          isAuth={isAuth}
          mainState={mainState}
          />
        }
  
  
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
