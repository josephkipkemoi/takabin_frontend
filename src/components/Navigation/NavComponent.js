import { Button } from 'react-bootstrap'
import './Nav.css'

const NavComponent = ({ isAuth, handleAuthState,setMainState }) => {
    
    const handleLogout = () => {
        localStorage.clear()
        window.location.reload()
    }

    const handleState = (e) => setMainState(e.target.name)

    return (
        <div className='nav'>
            <Button variant='primary'  name='request' onClick={handleState}>
                Home
            </Button>
            <Button name='help' onClick={handleState}>
                Help
            </Button>
             <Button name='collections' onClick={handleState}>
                Collections
            </Button>
            <Button name='profile' onClick={handleState}>
                Profile
            </Button>
            {isAuth ?   
            <Button onClick={handleLogout}>
                Logout
            </Button> :
            <Button name="login" onClick={handleAuthState}>
              Login
            </Button>
            }         
        </div>
    )
}

export default NavComponent