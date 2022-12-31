import React, { useEffect, useState } from "react"
import axios from "axios"
import UpdateAddressComponent from "../Address/UpdateAddressComponent"
import "./Collectee.css"
import UseRandomString from "../../hooks/useRandomString"
import { Modal, Spinner } from "react-bootstrap"
import { Link } from "react-router-dom"
import { PaymentModal } from "../Collections/CollectionComponent"

const CollecteeComponent = () => {
    const [error, setError] = useState('')
    const [collectionRequested, setCollectionRequested] = useState(false)
    const [addressUpdated, setAddressUpdated] = useState(false)
    const [updateAddress, setUpdateAddress] = useState(false)
    const [estimateCollectionTime, setEstimateCollectionTime] = useState(null)
    const [modalShow, setModalShow] = useState(false)
    const [serviceModalShow, setServiceModalShow] = useState(false)
    const [collections, setCollections] = useState([])

    const closeServiceModal = () => setServiceModalShow(false)

    const fetchCollections = async (userId) => {
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/users/${userId}/collectee/collections/pending`)
            setCollections(res.data)

            if(res.data.length > 0) {
                setEstimateCollectionTime(res.data.estimate_collection_time)
                setCollectionRequested(true)
            }
        } catch (error) {
            console.error(error?.message)
        }
   
    }

    
    const checkAddressStatus = async (userId) => {
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/addresses/users/${userId}`)
            if(res?.data?.address?.id) {
                setAddressUpdated(true)
            }
        } catch (error) {
            console.error(error)
        }
      
    }

    const handleRequest = () => {
        if(addressUpdated === false) {
            setError('Update your address location for easy collection by')
            return false
        }

        setServiceModalShow(true)
    }

    const handleUpdateAddress = () => {
        setModalShow(true)
    }

    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem('auth-user'))?.id
        checkAddressStatus(userId)
        fetchCollections(userId)
    }, [addressUpdated])

    return (
        <div className="d-flex justify-content-center flex-column align-items-center text-white mt-3">
            
            {error && 
                <p className="d-flex align-items-center">
                    {error}
                    <button 
                    className="btn text-light" 
                    onClick={(handleUpdateAddress)}
                    >
                        Clicking Here
                    </button>
                </p>
            }
            
            {serviceModalShow && 
            <ServicesModal 
                show={serviceModalShow} 
                closeServiceModal={closeServiceModal}
                setCollectionRequested={setCollectionRequested}
            />}

            {modalShow && <UpdateAddressComponent modalShow={modalShow} setModalShow={setModalShow}/>}

            <div className="d-flex flex-column align-items-center">
               
                <div className="mb-2 mt-2">
                    <button 
                        className="d-flex flex-column align-items-center rounded-pill btn btn-warning text-white fw-bold shadow btn-lg p-5" 
                        onClick={handleRequest} 
                    >
                        <Spinner variant="light" animation="grow" size="s">                    
                        </Spinner>
                    <span className="mt-5">Press to Request</span>
                    </button> 
                </div>

                <div className="timer">
                {collectionRequested &&
                    <TimerElement
                        estimateCollectionTime={estimateCollectionTime}
                        collections={collections}
                    />               
                }    
                </div>
               

            </div>
            
        </div>
    )
}

const TimerElement = ({ estimateCollectionTime, collections }) => {
    const time = new Date(estimateCollectionTime)
    const [payment, setPayment] = useState(125)
    const [paymentModalShow, setPaymentModalShow] = useState(false)
    console.log(collections)
    const CollectionElements = (n, i) => {
        return (
            <div className="mb-3 bg-primary shadow rounded">
            <div 
                key={i}
                className="d-flex flex-column align-items-center justify-content-center text-white p-3"
            >
                    <div className="m-1"> 
                        <p>
                            Item requested for collection, you will be contacted {estimateCollectionTime ? 
                            `by ${time.getDate() + '-' + time.getMonth() + '-' + time.getFullYear()}` : 
                            'soon'}
                        </p>
                        <p className="text-center">This service will cost <b>Kes. {payment}/=</b></p>
                    </div>                   
                    <div className="timer-cancel d-flex justify-content-center mt-3">
                        <button className="btn btn-danger rounded shadow m-1">Cancel Collection</button>
                        <Link to="/collections" className="btn btn-light rounded shadow m-1">View Status</Link>
                        <button className="btn btn-success m-1" onClick={() => setPaymentModalShow(true)}>Make Payment</button>
                    </div>
                    {paymentModalShow &&
                    <PaymentModal
                        payment={payment}
                        setPaymentModalShow={setPaymentModalShow}
                        paymentModalShow={paymentModalShow}
                    />
                }
            </div>
            </div>
        )
    }
    return (
            <div className="p-1 rounded-0 shadow mt-3">
                <h4>Pending Collections</h4>
                {collections.map(CollectionElements)}          
            </div>      
    )
}

const ServicesModal = ({ show, closeServiceModal,setCollectionRequested }) => {
    const [services, setServices] = useState([])
    const [serviceId, setServiceId] = useState(null)

    const handleRequest = async () => {
        const user_id = JSON.parse(localStorage.getItem('auth-user')).id
        const collection_id = UseRandomString()

      
        const res = await axios.post("http://localhost:8000/api/v1/collections", {
            user_id,
            collection_code: collection_id,
            service_id: serviceId
        })

        if(res.status === 201) {
            setCollectionRequested(true)
            closeServiceModal()
        }
    }

    const handleService = (id) => {
        setServiceId(id)
    }


    const fetchServices = async () => {
        const res = await axios.get("http://localhost:8000/api/v1/services")
        setServices(res?.data)
    }

    const ServicesElements = (n, i) => {

        return (
            <React.Fragment key={i}>
                <button 
                    className="btn btn-primary w-100 p-3 mb-2"
                    onClick={() => handleService(n.id)}
                >
                    {n.service}
                </button>
            </React.Fragment>
        )
    }

    useEffect(() => {
        fetchServices()
    }, [show])

    return (
        <Modal show={show}>
            <Modal.Header>
                Select Service
            </Modal.Header>
            <Modal.Body>
                {services.length > 0 && services.map(ServicesElements)}
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-danger" onClick={closeServiceModal}>Close</button>
                <button className="btn btn-primary" onClick={handleRequest}>Confirm</button>
            </Modal.Footer>
        </Modal>
    )
}


export default CollecteeComponent;