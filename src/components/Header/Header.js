import config from '../../config.json'
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    return (
        <header className='app-header'>
            <h1 className='fw-bold text-white m-1 d-flex flex-column'>
                <FontAwesomeIcon size='lg' icon={faTrashCan} className="bg-none p-4"/>
                {config.APP_NAME}
            </h1>
            <p className='text-white mt-3'>
                <i>
                    {config.APP_SLOGAN}
                </i>
            </p>
        </header>
    )
}

export default Header