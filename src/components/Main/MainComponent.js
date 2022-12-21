import { useEffect, useState } from "react"
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

    const checkAddressStatus = (addressDetails) => {
        if(addressDetails === false) {
            return setAddressUpdated(false)
        }

        setAddressUpdated(true)
    }

    const handleUpdateAddress = () => {
        setUpdateAddress(true)
    }

    useEffect(() => {
        const addressDetails = localStorage.getItem('user-address')
        checkAddressStatus(Boolean(addressDetails))
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