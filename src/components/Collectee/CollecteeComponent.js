import React, { useEffect, useState } from "react"
import axios from "axios"
import UpdateAddressComponent from "../Address/UpdateAddressComponent"
import "./Collectee.css"
import UseRandomString from "../../hooks/useRandomString"
import { Modal, Spinner } from "react-bootstrap"
import { Link } from "react-router-dom"
import { PaymentModal } from "../Collections/CollectionComponent"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
    faInfoCircle, 
    faDotCircle, 
    faEyeLowVision, 
    faLocation, 
    faMousePointer 
} from "@fortawesome/free-solid-svg-icons"

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
        const userId = JSON.parse(localStorage.getItem('user'))?.user?.id
        checkAddressStatus(userId)
        fetchCollections(userId)
    }, [addressUpdated])

    return (
        <div className="d-flex justify-content-center flex-column align-items-center text-white mt-3">
            
            {error && 
                <p className="d-flex align-items-center alert alert-danger shadow rounded-0">
                    <FontAwesomeIcon icon={faLocation} className="m-1"/>
                    {error}
                    <button 
                    className="btn btn-danger m-1" 
                    onClick={(handleUpdateAddress)}
                    >
                        Clicking Here
                        <FontAwesomeIcon icon={faMousePointer} style={{ marginLeft: 4 }}/>
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

                <div className="">
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

const TimerElement = ({ collections }) => {
    const [payment, setPayment] = useState(125)
    const [paymentModalShow, setPaymentModalShow] = useState(false)

    const CollectionElements = (n, i) => {
        return (
            <div>
            <div 
                key={i}
                className="d-flex flex-row align-items-center justify-content-center text-white p-1"
            >
                <div>
                    <FontAwesomeIcon icon={faInfoCircle} className="btn btn-lg text-light shadow-sm rounded-pill"/>
                </div>
                <div className="p-1 shadow bg-light collection-block d-flex align-items-center justify-content-between rounded-pill">
                    <div className="coll-child-left">
                        <small className="text-dark fw-bold d-flex align-items-center">
                            <FontAwesomeIcon icon={faDotCircle} size="sm" className="text-warning" style={{ marginRight: 4 }}/>
                            Active   
                        </small>
                    </div>                  
                    <div className="coll-child-right d-flex align-items-center">
                       <button className="btn btn-sm m-1 rounded-pill shadow-sm text-secondary">Cancel</button>
                        <Link to="/collections" className="btn btn-primary btn-sm m-1 rounded-pill shadow">
                            <FontAwesomeIcon icon={faEyeLowVision} />
                            View
                        </Link>
                    </div>                   
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
            <div className="rounded shadow mt-3 mb-5 bg-info p-3">
                <h6 className="text-center shadow-sm fw-bold alert alert-primary rounded-0 p-2">Active collections</h6>
                {collections.map(CollectionElements)}          
            </div>      
    )
}

const ServicesModal = ({ show, closeServiceModal,setCollectionRequested }) => {
    const [services, setServices] = useState([])
    const [serviceId, setServiceId] = useState(null)

    const handleRequest = async () => {
        const user_id = JSON.parse(localStorage.getItem('user'))?.user?.id
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