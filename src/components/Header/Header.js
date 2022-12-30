import config from '../../config.json'
import './Header.css'

const Header = () => {
    return (
        <header className='app-header'>
            <h1 className='fw-bold text-white m-5'>{config.APP_NAME}</h1>
            <p className='text-white'>
            <i>
                {config.APP_SLOGAN}
            </i>
            </p>
        </header>
    )
}

export default Header