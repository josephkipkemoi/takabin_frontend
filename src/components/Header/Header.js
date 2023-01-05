import config from '../../config.json'
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    return (
        <header  className='d-flex flex-column justify-content-center align-items-center text-white m-3'>
            <h1 className='d-flex align-items-center'>
                <FontAwesomeIcon size='lg' icon={faTrashCan} />
               <span className='app-name'>{config.APP_NAME}</span>           
            </h1>
            <i className='mt-2'>
                {config.APP_SLOGAN}
            </i>
        </header>
    )
}

export default Header