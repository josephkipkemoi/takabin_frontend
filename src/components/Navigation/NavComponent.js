import './Nav.css'

const NavComponent = ({ isAuth, handleAuthState }) => {
    const handleLogout = () => {
        localStorage.clear()
        window.location.reload()
    }
    return (
        <div className='nav'>
            <button>
                Help
            </button>
             <button>
                Collections
            </button>
            {isAuth ?   
            <button onClick={handleLogout}>
                Logout
            </button> :
            <button onClick={handleLogout} name="login" onClick={handleAuthState}>
              Login
            </button>
            }
         
        </div>
    )
}

export default NavComponent