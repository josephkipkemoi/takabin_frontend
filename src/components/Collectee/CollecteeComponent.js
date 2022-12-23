import { useEffect, useState } from "react"
import axios from "axios"
import UpdateAddressComponent from "../Address/UpdateAddressComponent"
// import "./Collectee.css"
import UseRandomString from "../../hooks/useRandomString"
import { Spinner } from "react-bootstrap"

const CollecteeComponent = () => {
    const [error, setError] = useState('')
    const [collectionRequested, setCollectionRequested] = useState(false)
    const [addressUpdated, setAddressUpdated] = useState(false)
    const [updateAddress, setUpdateAddress] = useState(false)
    const [estimateCollectionTime, setEstimateCollectionTime] = useState(null)
    const [modalShow, setModalShow] = useState(false)

    const fetchCollections = async (userId) => {
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/users/${userId}/collectee/collections/pending`)
            if(res.data.id) {
                setEstimateCollectionTime(res.data.estimate_collection_time)
                setCollectionRequested(true)
            }
        } catch (error) {
            console.error(error?.message)
        }
   
    }

    const handleRequest = async () => {
        const user_id = JSON.parse(localStorage.getItem('auth-user')).id
        const collection_id = UseRandomString()

        if(addressUpdated === false) {
            setError('Update your address location for easy collection by')
            return false
        }
        const res = await axios.post("http://localhost:8000/api/v1/collections", {
            user_id,
            collection_id
        })
        if(res.status === 201) {
            setCollectionRequested(true)
        }
    }

    const checkAddressStatus = async (userId) => {
        const res = await axios.get(`http://localhost:8000/api/v1/addresses/users/${userId}`)
        if(res?.data?.id) {
            setAddressUpdated(true)
        }
    }

    const handleUpdateAddress = () => {
        setModalShow(true)
    }

    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem('auth-user')).id
        checkAddressStatus(userId)
        fetchCollections(userId)
    }, [addressUpdated])
    return (
        <div className="d-flex justify-content-center flex-column align-items-center text-white mt-5">
            
            {collectionRequested && <p>Garbage queued for collection</p>}

            {error && 
                <p className="d-flex align-items-center">
                    {error}
                    <button 
                    className="btn text-light" 
                    onClick={handleUpdateAddress}
                    >
                        Clicking Here
                    </button>
                </p>
            }
            
            {modalShow && <UpdateAddressComponent modalShow={modalShow} setModalShow={setModalShow}/>}

            <div>
                {collectionRequested ? 
                <TimerElement
                estimateCollectionTime={estimateCollectionTime}
                /> :
                <button 
                    className="d-flex flex-column align-items-center btn btn-warning text-white fw-bold shadow btn-lg p-5" 
                    onClick={handleRequest} 
                    disabled={collectionRequested}
                >
                    <Spinner animation="grow" size="xl">                    
                    </Spinner>
                   <span className="mt-5"> Click to Request</span>
                </button>
                }             
            </div>
        </div>
    )
}

const TimerElement = ({ estimateCollectionTime }) => {
    return (
        <div >
            <div className="bg-primary p-5 rounded-pill shadow">
                <div 
                className="d-flex flex-column align-items-center justofy-content-center text-white"
                >
                    <h4>Queued for Pickup</h4>
                    <p>
                        Estimated Time
                    </p>
                    <small>{estimateCollectionTime}</small>    
                    <div>
                        <small>
                        Kindly be patient as our collectors come for the Garbage
                        </small>
                    </div>
                </div>
                             
            </div>
            <div className="timer-cancel d-flex justify-content-center m-3">
                <button className="btn btn-danger rounded-0">Cancel Collection</button>
            </div>
        </div>
      
    )
}


export default CollecteeComponent