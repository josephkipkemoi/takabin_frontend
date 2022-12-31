import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Nav.css'
import config from '../../config.json'

const NavComponent = ({ user }) => {
    const [userRole, setUserRole] = useState(null)

    const handleLogout = () => {
        localStorage.clear()
        window.location.href = '/'
    }

    useEffect(() => {
        const role = JSON.parse(localStorage.getItem('user'))?.role
        setUserRole(role)
    }, [user?.id])
    
    return (    
        <div className='nav d-flex justify-content-around'>
            <Link className='btn' to="/">
                Home
            </Link>
            <Link className='btn' to="/help">
                Help
            </Link>
             <Link className='btn' to={userRole === config.COLLECTOR_USER_ROLE ? "/collector" : '/collections'}>
                Collections
            </Link>
            <Link className='btn' to="/profile">
                Profile
            </Link>
            {Boolean(user?.id) ?   
            <Button onClick={handleLogout}>
                Logout
            </Button> :
            <Link to="/login" className='btn'>
              Login
            </Link>
            }         
        </div>
    )
}

export default NavComponent