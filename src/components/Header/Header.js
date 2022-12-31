import config from '../../config.json'
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    return (
        <header className='app-header'>
            <h1 className='fw-bold text-white m-3 d-flex flex-column'>
                <span className='mb-2'>
                    <FontAwesomeIcon size='lg' icon={faTrashCan} className="mb-3 bg-primary p-4 rounded shadow"/>
                </span>
                {config.APP_NAME}
            </h1>
            <p className='text-white'>
                <i>
                    {config.APP_SLOGAN}
                </i>
            </p>
        </header>
    )
}

export default Header