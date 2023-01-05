import React, { useEffect, useState } from "react"
import axios from "../../lib/Axios"
import UpdateAddressComponent from "../Address/UpdateAddressComponent"
import "./Collectee.css"
import UseRandomString from "../../hooks/useRandomString"
import { Modal, Spinner } from "react-bootstrap"
import { PaymentModal } from "../Collections/CollectionComponent"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
    faInfoCircle, 
    faLocation, 
    faMousePointer,
    faTools,
    faCheckCircle,
    faHandPointUp
} from "@fortawesome/free-solid-svg-icons"
import './Collectee.css'
import ToastElement from "../../elements/ToastElement"
import { useGetServiceByIdQuery } from "../../hooks/api/services"
import { useGetUncollectedCollectionsQuery } from "../../hooks/api/collections"

const CollecteeComponent = ({ user }) => {
    const [errors, setError] = useState('')
    const [modalShow, setModalShow] = useState(false)
    const [serviceModalShow, setServiceModalShow] = useState(false)

    const { data, refetch, isLoading, error } = useGetUncollectedCollectionsQuery(user?.id, false)

    if(error) {
        return <span className="alert alert-danger">Error!</span>
    }

    if(isLoading) {
        return <Spinner animation="grow" />
    }
    const closeServiceModal = () => setServiceModalShow(false)

    const handleRequest = async () => {
   
        const res = await axios.get(`api/v1/validate?type=address&phone_number=${user.phone_number}`)

        if(Boolean(res.data.address_updated) === false) {
            setError('Update your address location for easy collection by')
            return false
        }
        setError('')
        setServiceModalShow(true)
    }

    const handleUpdateAddress = () => {
        setModalShow(true)
    }

    return (
        <div className="d-flex justify-content-center flex-column align-items-center text-white mt-3">
            
            {errors && 
                <p className="d-flex align-items-center alert alert-danger shadow rounded-0">
                    <FontAwesomeIcon icon={faLocation} className="m-1"/>
                    {errors}
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
                refetch={refetch}
            />
            }

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
                   
                   <UncollectedCollectionsComponent
                            data={data}
                        />               
                    
                </div>
            
            </div>
            
        </div>
    )
}

const UncollectedCollectionsComponent = ({ data }) => {
    const [payment, setPayment] = useState(125)
    const [paymentModalShow, setPaymentModalShow] = useState(false)

    const CollectionElements = (n, i) => {
    
        // const service = useGetServiceByIdQuery(n.service_id)
        return (
            <div key={i} className="mb-2">
                <ToastElement code={n.collection_code} service={n.service_id}/>
                {/* {paymentModalShow &&
                    <PaymentModal
                        payment={payment}
                        setPaymentModalShow={setPaymentModalShow}
                        paymentModalShow={paymentModalShow}
                    />
                } */}
            </div>
        )
    }

    return (
            <div className="toast-absolute">
                {data?.map(CollectionElements)}          
            </div>      
    )
}

const ServicesModal = ({ show, closeServiceModal, refetch }) => {
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
                refetch()
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