import axios from "axios"
import React, { useEffect, useState } from "react"
import Header from "../../components/Header/Header"
import NavComponent from "../../components/Navigation/NavComponent"

const Collector = () => {
    const [collectionCount, setCollectionCount] = useState(0)
    const [collections, setCollections] = useState({})
    const [addressDetails, setAddressDetails] = useState({})

    const fetchCollections = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/v1/collections/view')
            setCollections(res.data.collections.data)
            setCollectionCount(res.data.collections_count)
         } catch (error) {
            console.error(error)
        }
    }

    const handleViewDetails = async (user_id) => {
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/addresses/users/${user_id}`)
            setAddressDetails(res.data)   
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
                <div className="bg-info shadow-sm mb-3 p-3 d-flex align-items-center justify-content-between">
                    <div>
                        <p>Contact: {n.phone_number}</p>
                    </div>
                    <div>
                        <button className="btn btn-primary rounded-0 m-1" onClick={() => handleCollection(n.id)}>
                            Book for collection
                        </button>
                        <button className="btn btn-primary rounded-0 m-1" onClick={() => handleViewDetails(n.id)}>
                            View Details
                        </button>    
                    </div>
                               
                </div>
                <div>

                </div>
                {(Boolean(addressDetails.id) && addressDetails.user_id === n.id) &&
                        <AddressDetailsComponent
                        addressDetails={addressDetails}
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
            <div className="container">
                <div className="card border-0">
                    <div className="card-header bg-primary text-white">
                        <h3>Collections</h3>
                    </div>
                    <div className="card-body">
                        <p>{collectionCount} collections available for pickup</p>
                        <hr/>
                        {Boolean(collections.users) &&
                        collections?.users?.map(CollectionElements)
                        }
                    </div>
                </div>
              
            </div>
            <NavComponent/>
        </>
     
    )
}

const AddressDetailsComponent = ({ addressDetails }) => {

    return (
        <div className="p-3">
         <h5>Pickup Location</h5>
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

export default Collector