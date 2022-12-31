import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

import AuthComponent from './components/Auth/AuthComponent';
import LoginComponent from './components/Auth/LoginComponent';
import CollecteeComponent from './components/Collectee/CollecteeComponent';
import Header from './components/Header/Header';
import NavComponent from './components/Navigation/NavComponent';
import ServiceComponent from './components/ServicesOffered/ServiceComponent';
import TopNavigation from './components/TopNavigation/TopNavigation';
import axios from './lib/Axios';
import Collectee from './pages/Collectee/Collectee';

function App() {

  const [user, setUser] = useState(null)

  const checkIsAuth = async (token) => {
    try {
      const res = await axios.get('api/user', {
        headers: {
                  'Authorization': token?.type + " " + token?.token
          }
      })
      setUser(res.data)
    } catch (error) {
      if(error.response.status === 401) {
        setUser(null)
      }
    }
    
  }

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('auth'))?.authorization

    checkIsAuth(token)
  }, [user])
 
  return (
    <>
        {Boolean(user?.id) === true && <TopNavigation/>}

        <div className='container'> 
            <Header/>

            {Boolean(user?.id) === false && <AuthComponent/>}

            {Boolean(user?.id) === true && <Collectee/>}
            
            <ServiceComponent/> 
    
        </div>
     
        <NavComponent user={user} /> 

        <Routes>
            <Route path='/login' element={<LoginComponent/>}/>
            <Route path='/collections' element={<CollecteeComponent/>}/>
        </Routes>
    </>
  );
}

export default App;
