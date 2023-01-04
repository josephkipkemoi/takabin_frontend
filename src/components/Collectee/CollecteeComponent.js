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
    faMousePointer,
    faTools,
    faCheckCircle,
    faHandPointUp
} from "@fortawesome/free-solid-svg-icons"
import './Collectee.css'
import ToastElement from "../../elements/ToastElement"

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
            const res = await axios.get(`http://localhost:8000/api/v1/users/${userId}/collectee/collections?collected=0`)
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
               
                <div className="m-4">
                    <button 
                        className="d-flex flex-column justify-content-center align-items-center rounded-circle btn text-white fw-bold shadow btn-lg p-5 shake-btn" 
                        onClick={handleRequest} 
                        style={{ width: '240px', height: '240px' }}
                    >                     
                    <span className="d-flex flex-column justify-content-center align-items-center">
                        <FontAwesomeIcon icon={faHandPointUp} style={{ width: '60px', height: '60px' }}/>
                        <span className="mt-3">Press to Request</span> 
                    </span>
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
            <div key={i} className="mb-2">
                <ToastElement/>
            {/* <div 
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
            </div> */}
            </div>
        )
    }
    return (
            <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                {collections.map(CollectionElements)}          
            </div>      
    )
}

const ServicesModal = ({ show, closeServiceModal,setCollectionRequested }) => {
    const [errors, setErrors] = useState([])
    const [services, setServices] = useState([])
    const [serviceId, setServiceId] = useState(null)

    const handleRequest = async () => {
        const user_id = JSON.parse(localStorage.getItem('user'))?.user?.id
        const collection_id = UseRandomString()

        try {
            const res = await axios.post("http://localhost:8000/api/v1/collections", {
                user_id,
                collection_code: collection_id,
                service_id: serviceId
            })
    
            if(res.status === 201) {
                setCollectionRequested(true)
                closeServiceModal()
            }
        } catch (error) {
            console.error(error)
            if(error.response.status === 422) {
                setErrors(['Please select at least one field'])
            }
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
                    className="btn btn-outline-success m-3 shadow card-box"
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
            <Modal.Header className="bg-primary text-white fw-bold d-flex justify-content-start align-items-center">
                <FontAwesomeIcon icon={faTools} style={{ marginRight: 8 }}/>
               <p>Service</p> 
            </Modal.Header>
            {errors.length > 0 && 
            errors.map((err, i) => 
            <span key={i} className="d-block alert alert-danger w-100">
                <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: 4 }} />
                {err}
            </span>)}
            <Modal.Body className="custom-row">                
               
                {services.length > 0 && services.map(ServicesElements)}
            </Modal.Body>
            <Modal.Footer>
                <button className="btn" onClick={closeServiceModal}>Close</button>
                <button className="btn btn-primary rounded-0 d-flex align-items-center" onClick={handleRequest}>
                    <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: 4 }} />
                    Confirm
                </button>
            </Modal.Footer>
        </Modal>
    )
}


export default CollecteeComponent;