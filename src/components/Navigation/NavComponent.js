import './Nav.css'

const NavComponent = ({ isAuth, handleAuthState,setMainState }) => {
    
    const handleLogout = () => {
        localStorage.clear()
        window.location.reload()
    }

    const handleState = (e) => setMainState(e.target.name)

    return (
        <div className='nav'>
            <button name='request' onClick={handleState}>
                Home
            </button>
            <button name='help' onClick={handleState}>
                Help
            </button>
             <button name='collections' onClick={handleState}>
                Collections
            </button>
            <button name='profile' onClick={handleState}>
                Profile
            </button>
            {isAuth ?   
            <button onClick={handleLogout}>
                Logout
            </button> :
            <button name="login" onClick={handleAuthState}>
              Login
            </button>
            }         
        </div>
    )
}

export default NavComponent