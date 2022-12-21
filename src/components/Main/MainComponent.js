import { useEffect, useState } from "react"
import axios from "axios"
import UpdateAddressComponent from "../Address/UpdateAddressComponent"
import "./Main.css"

const MainComponent = () => {
    const [error, setError] = useState('')
    const [collectionRequested, setCollectionRequested] = useState(false)
    const [addressUpdated, setAddressUpdated] = useState(false)
    const [updateAddress, setUpdateAddress] = useState(false)

    const handleRequest = () => {
        if(addressUpdated === false) {
            setError('Update your address location for easy collection by')
            return false
        }
        setCollectionRequested(true)
    }

    const checkAddressStatus = async (userId) => {
        const res = await axios.get(`http://localhost:8000/api/v1/addresses/users/${userId}`)
        if(res?.data?.id) {
            setAddressUpdated(true)
        }
    }

    const handleUpdateAddress = () => {
        setUpdateAddress(true)
    }

    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem('auth-user')).id
        checkAddressStatus(userId)
    }, [addressUpdated])
    return (
        <div className="main-container">
            
            {collectionRequested && <p>Garbage queued for collection</p>}

            {error && 
                <p>
                    {error}
                    <button className="main-btn" onClick={handleUpdateAddress}>Clicking Here</button>
                </p>
            }
            
            {updateAddress && <UpdateAddressComponent/>}

            <div className="main">
                {collectionRequested ? 
                <TimerElement/> :
                <button 
                    className="request-btn" 
                    onClick={handleRequest} 
                    disabled={collectionRequested}
                >
                    Request
                </button>
                }             
            </div>
        </div>
    )
}

const TimerElement = () => {
    return (
        <div>
            <div className="timer">
                <p>Queued </p>
                <p>
                    Estimated Time
                </p>
                <small>1hr 36Mins</small>                    
            </div>
            <div className="timer-cancel">
                <button>Cancel Collection</button>
            </div>
        </div>
      
    )
}


export default MainComponent