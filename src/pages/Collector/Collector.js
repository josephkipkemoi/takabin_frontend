import axios from "axios"
import React, { useEffect, useState } from "react"
import { Modal } from "react-bootstrap"
import Header from "../../components/Header/Header"
import NavComponent from "../../components/Navigation/NavComponent"

const Collector = () => {
    const [collectionCount, setCollectionCount] = useState(0)
    const [collections, setCollections] = useState({})
    const [addressDetails, setAddressDetails] = useState({})
    const [userDetails, setUserDetails] = useState({})

    const fetchCollections = async () => {
        const serviceId = JSON.parse(localStorage.getItem('auth-user')).service_id
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/collections/view?service_id=${serviceId}`)
            setCollections(res.data.collections)
            setCollectionCount(res.data.collections_count)
         } catch (error) {
            console.error(error)
        }
    }

    const handleViewDetails = async (user_id) => {
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/addresses/users/${user_id}`)
            setUserDetails(res.data.user)
            setAddressDetails(res.data.address)   
        } catch (error) {
            console.error(error)
        }
      
    }

    const handleCollection =  async (user_id) => {
        const collector_id = JSON.parse(localStorage.getItem('auth-user')).id
        try {
            const res = await axios.patch(`http://localhost:8000/api/v1/collections/${user_id}/patch`, {
                collector_id,
                estimate_collection_time: '2022-12-20 17:28:29'
            })
         } catch (error) {
            console.error(error)
        }
    
    }

    const CollectionElements = (n, i) => {
       
        return (
            <React.Fragment key={i}>
                <div className="bg-primary shadow-sm mb-3 p-3 d-flex align-items-center justify-content-between">
                    <div className="text-white">
                        <p>Collection Code: {n.collection_code}</p>
                    </div>
                    <div>
                        {Boolean(n.collector_id) ? 
                          <button className="btn btn-info rounded-0 m-1" onClick={() => alert(n.id)}>
                            Request Payment
                          </button>
                        : 
                            <button className="btn btn-info rounded-0 m-1" onClick={() => handleCollection(n.id)}>
                                Book for collection
                            </button>
                        }
                      
                        <button className="btn btn-info rounded-0 m-1" onClick={() => handleViewDetails(n.user_id)}>
                            View Details
                        </button>    
                    </div>
                               
                </div>
                <div>

                </div>
                {(Boolean(addressDetails.id) && addressDetails.user_id === n.id) &&
                        <AddressDetailsComponent
                        addressDetails={addressDetails}
                        userDetails={userDetails}
                    />
                }                  
            </React.Fragment>
        )
    }

    useEffect(() => {
        fetchCollections()
    }, [])

    return (
        <>
            <Header/>
            <div className="container mt-4">
                <div className="card border-0">
                    <div className="card-header bg-primary text-white">
                        <h3>Collections</h3>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <button className="btn btn-primary">Filter</button>
                        </div>
                        <p>{collectionCount} collections available for pickup</p>
                        <hr/>
                        {Boolean(collections.length) &&
                         collections?.map(CollectionElements)
                        }
                    </div>
                </div>              
            
            </div>
            <NavComponent/>
        </>
     
     )
}

const AddressDetailsComponent = ({ addressDetails,userDetails }) => {

    return (
        <div className="p-2">
            <div className="d-flex justify-content-between align-items-center">
                <h5>Pickup Location</h5>
                <p>Contact No: {userDetails.phone_number}</p>
            </div>
    
         <div className="d-flex justify-content-between">
            <div>
                <span className="d-block">County: {addressDetails.county}</span>
                <span className="d-block">Sub County/Constituency: {addressDetails.sub_county}</span>
            </div>
            <div>
                <span className="d-block">Estate/Apartment: {addressDetails.estate}</span>
                <span className="d-block">House Number: {addressDetails.house_number}</span>
            </div>  
         </div>          
        </div>
    )
}

const PaymentComponent = ({ showPayment }) => {
    return (
        <Modal show={showPayment}>
            <Modal.Header>
                Requesting...
            </Modal.Header>
            <Modal.Body>
                <button>Confirm</button>
                <button>Cancel</button>
            </Modal.Body>
        </Modal>
    )
}

export default Collector